// components/AuthGuard.tsx
"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import { Loader } from "@classify/ui";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { user, loading } = useUser();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        console.log('AuthGuard', user, loading);
        if (loading) return;


        if (!user && pathname !== "/auth") {
            console.log("worked");

            router.push("/auth");
        }

        if (user && pathname === "/auth") {
            router.push("/dashboard");
        }

    }, [user, loading, router, pathname]);

    if (loading) {
        return <div style={{ height: '100vh' }}>
            <Loader size={"lg"} />
        </div>;
    }

    if (!user && pathname !== "/auth") {
        return null;
    }

    return <>{children}</>;
}