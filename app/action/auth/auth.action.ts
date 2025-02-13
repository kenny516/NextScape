"use server"

import { action } from "@/lib/zsa";
import z from "zod";
import bcrypt from 'bcrypt';
import { prisma } from "@/prisma/prisma";


export const signUpAction = action
    .input(z.object({
        username: z.string(),
        email: z.string().email(),
        password: z.string().min(8),
    }))
    .handler(async ({ input }) => {
        try {
            const existingUser = await prisma.user.findUnique({
                where: { email: input.email }
            });



            if (existingUser) {
                throw new Error('Email already in use.');
            }

            input.password = await hashPassword(input.password);
            const newUser = await prisma.user.create({
                data: {
                    name: input.username,
                    email: input.email,
                    password: input.password,
                }
            });
            console.log("Nouvel utilisateur inscrit :", newUser);
            return newUser;
        } catch (error) {
            console.error("❌ Erreur Prisma :", JSON.stringify(error, null, 2));
            throw new Error("Erreur interne lors de la création de l'utilisateur.");
        }
    });



export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
}

export const comparePassword = async (password: string, hashedPassword: string) => {
    return await bcrypt.compare(password, hashedPassword);
}
