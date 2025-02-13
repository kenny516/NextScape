"use client";
import { createContext, useContext, useEffect, useState, PropsWithChildren } from 'react';
import { useSession } from 'next-auth/react';

interface UserContextType {
    user: { id: string; name: string; email: string; image?: string } | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const { data: session } = useSession();
    const [user, setUser] = useState<{ id: string; name: string; email: string; image?: string } | null>(null);
    console.log(session);
    useEffect(() => {
        if (session?.user) {
            setUser({
                id: session.user.id,
                name: session.user.name,
                email: session.user.email,
                image: session.user.image || undefined,
            });
        } else {
            setUser(null);
        }
    }, [session]);

    return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
