"use client";

import { useLocale } from "@/lib/hooks";
import { Spinner } from "@heroui/react";
const Component = ({ label }: { label: string }) => (
    <Spinner
        label={label}
        color="success"
        labelColor="success"
        size="lg"
        className="m-auto w-full h-full"
    />
);

export const LoadingSpinner = ({ isFullPage }: { isFullPage?: boolean }) => {
    const { t } = useLocale();

    if (isFullPage)
        return (
            <div className="flex justify-center items-center w-[100vw] h-[100vh]">
                <Component label={t.global.loading} />
            </div>
        );

    return <Component label={t.global.loading} />;
};

export default LoadingSpinner;
