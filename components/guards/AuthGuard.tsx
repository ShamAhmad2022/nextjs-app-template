"use client";

import { Routs } from "@/lib/enums";
import { useLocale } from "@/lib/hooks";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

interface Params {
    children: React.ReactNode;
}

const AuthGuard = React.memo(({ children }: Params) => {
    const { navigate } = useLocale();

    const { status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            navigate({ href: Routs.ROOT });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    return <>{children}</>;
});

export default AuthGuard;
