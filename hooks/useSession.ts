'use client';

import { useEffect } from 'react';
import { authClient } from '@/lib/auth-client';
import { useUserStore } from '@/stores/useUserStore';

export function useSession() {
    const { user, setUser } = useUserStore();

    useEffect(() => {
        const initSession = async () => {
            try {
                const session = await authClient.getSession();
                if (session?.data?.user) {
                    setUser({
                        ...session.data.user,
                        image: session.data.user.image || undefined
                    });
                }
            } catch (error) {
                console.error('Failed to fetch session:', error);
                setUser(null);
            }
        };

        if (!user) {
            initSession();
        }
    }, [user, setUser]);

    return { user };
}