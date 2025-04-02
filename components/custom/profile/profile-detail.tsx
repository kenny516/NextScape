import { Badge } from '@/components/ui/badge';
import { getUser } from '@/lib/auth-session';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react'
import { Card } from '@/components/ui/card';

export async function ProfileDetail() {
    const user = await getUser();

    return (
        <div className='w-full max-w-3xl mx-auto py-8 px-4'>
            <Head>
                <title>{user?.name} - Profil</title>
            </Head>

            <Card className="overflow-hidden bg-card">
                <div className="relative h-32 bg-primary/50">
                    <div className="absolute -bottom-12 left-8">
                        <Image
                            className="rounded-full border-4 border-background shadow-lg"
                            src={user?.image ?? 'https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-02-albo9B0tWOSLXCVZh9rX9KFxXIVWMr.png'}
                            alt="Photo de profil"
                            width={100}
                            height={100}
                        />
                    </div>
                </div>

                <div className="pt-16 px-8 pb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-2xl font-bold mb-1 text-foreground">{user?.name}</h1>
                            <Badge variant="secondary" className="font-medium">
                                {user?.emailVerified ? 'Vérifié ✓' : 'Non vérifié'}
                            </Badge>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center space-x-2 text-muted-foreground">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            <span>{user?.email}</span>
                        </div>

                        <div className="flex items-center space-x-2 text-muted-foreground">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            <span>Membre depuis {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            }) : 'Date inconnue'}</span>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}
