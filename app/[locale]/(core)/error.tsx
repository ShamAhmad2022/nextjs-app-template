"use client";

import { SharedText } from "@/components";
import { useEffect, useState } from "react";
import { useLocale } from "@/lib/hooks";
import { Routs } from "@/lib/enums";
import { Button, Divider } from "@heroui/react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const [errorData, setErrorData] = useState<Error & { digest?: string }>();
    const { t, navigate } = useLocale();

    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
        setErrorData(error);
    }, [error]);

    return (
        <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center gap-7 p-10 overflow-hidden">
            {/* <Image
                src={logo}
                alt="ssf logo"
                width={500}
                height={300}
                className="w-[60px] object-cover md:w-[120px]"
            /> */}

            <SharedText className="text-center w-[400px] text-[30px] font-bold">
                {t.global.errorPage.errorMessage}
            </SharedText>

            <SharedText className="text-center text-[20px] text-danger">
                {errorData?.message}
            </SharedText>

            <Divider className="w-[400px]" />

            <div className="grid grid-cols-2 w-[300px] gap-5">
                <Button
                    color="secondary"
                    onPress={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                >
                    {t.global.errorPage.tryAgain}
                </Button>

                <Button color="secondary" onPress={() => window.location.reload()}>
                    {t.global.errorPage.reload}
                </Button>

                <Button
                    color="secondary"
                    onPress={() =>
                        navigate({
                            href: Routs.ROOT,
                        })
                    }
                >
                    {t.global.errorPage.goToHome}
                </Button>

                <Button
                    color="secondary"
                    onPress={() =>
                        navigate({
                            href: Routs.LOGIN,
                        })
                    }
                >
                    {t.global.errorPage.goToLogin}
                </Button>
            </div>
        </div>
    );
}
