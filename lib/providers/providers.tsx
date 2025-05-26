/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import * as React from "react";
import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import TanStackProvider from "./TanStackProvider";
import { SessionProvider } from "next-auth/react";
import ReduxProvider from "./ReduxProvider";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ReduxProvider>
            <SessionProvider>
                <TanStackProvider>
                    <HeroUIProvider>
                        <ToastProvider />
                        {children}
                    </HeroUIProvider>
                </TanStackProvider>
            </SessionProvider>
        </ReduxProvider>
    );
}
