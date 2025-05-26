"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useLocale } from "@/lib/hooks";
import { Routs } from "@/lib/enums";
interface Params {
    children: React.ReactNode;
}

const CoreGuard = React.memo(({ children }: Params) => {
    const { navigate } = useLocale();

    const session = useSession();

    useEffect(() => {
        if (session) {
            if (session.status === "unauthenticated") {
                navigate({ href: Routs.LOGIN });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session]);

    return <>{children}</>;
});

export default CoreGuard;
