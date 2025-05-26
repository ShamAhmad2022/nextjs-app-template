"use client";

import React from "react";
import type { ButtonProps } from "@heroui/react";
import { Button } from "@heroui/react";

export type Props = ButtonProps & {
    className?: string;
};

export const MainButton = React.memo(({ children, className, ...props }: Props) => {
    return (
        <Button {...props} className={`bg-green-1 text-white ${className}`}>
            {children}
        </Button>
    );
});
