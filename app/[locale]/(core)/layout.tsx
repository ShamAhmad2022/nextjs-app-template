/* eslint-disable react-refresh/only-export-components */
import type { Metadata } from "next";
import { i18n } from "@/lib/locales/i18n.config";
import { Providers } from "@/lib/providers/providers";
import { Sen } from "next/font/google";
import { appMetadata } from "@/lib/constants";
import { Locale } from "app";
import "@/lib/styles/globals.css";
/**
 * Setup the font
 */
const sen = Sen({ subsets: ["latin"], weight: "500" });
/**
 * Setup te website metadata
 */
export const metadata: Metadata = appMetadata;

/**
 * Generate all the available locales in the server
 * before the client renders the pages
 */
export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
    children,
    params: { locale },
}: Readonly<{
    children: React.ReactNode;
    params: { locale: Locale };
}>) {
    return (
        <html lang={locale} className="">
            <body
                className={`${sen.className}`}
                style={{
                    direction: locale === "en" ? "ltr" : "rtl",
                }}
            >
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
