"use client";

import { usePathname, useRouter } from "next/navigation";
import ar from "../../locales/ar";
import en from "../../locales/en";
import { Routs } from "@/lib/enums";
import { join } from "path";
import { useMemo } from "react";
import { Locale } from "app";

const simpleRouts = [Routs.LOGIN];

const redirectedPathName = (locale: string, pathname: string) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
};

const getLocale = (pathname: string): Locale => {
    if (!pathname) return "en";
    const segments = pathname.split("/");
    return segments[1] as Locale;
};

const getDictLocales = (locale: Locale): typeof ar | typeof en => (locale === "ar" ? ar : en);

export function useLocale() {
    const pathName = usePathname();
    const router = useRouter();
    const dicts = getDictLocales(getLocale(pathName));
    const locale = getLocale(pathName);

    const navigate = ({
        href,
        replacements,
    }: {
        href: Routs;
        replacements?: { [key: string]: string };
    }) => {
        let newHref: string = href;

        if (replacements) {
            Object.entries(replacements).forEach(([key, value]) => {
                newHref = newHref.replaceAll(key, value);
            });
        }

        const localizedHref = "/" + join(locale, newHref);

        router.push(localizedHref);
    };

    const currentRout: Routs = useMemo(() => {
        for (let index = 0; index < simpleRouts.length; index++) {
            const rout = simpleRouts[index];
            if (pathName.indexOf(rout) !== -1) return rout;
        }

        return Routs.ROOT;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathName, locale]);

    return {
        /** get the current locale */
        locale,
        /** toggle between AR and EN */
        toggleLocale: (locale?: Locale) => {
            const newPath = redirectedPathName(
                locale || (getLocale(pathName) === "en" ? "ar" : "en"),
                pathName,
            );

            router.push(newPath);
        },
        /** get the dictionaries for the current active locale */
        t: dicts,
        navigate,
        currentRout,
    };
}
