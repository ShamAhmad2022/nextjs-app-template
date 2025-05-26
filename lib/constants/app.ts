import { Metadata } from "next";

export const FRONTEND_BASE = process.env.NEXT_PUBLIC_FRONTEND_DOMAIN;
export const BACKEND_BASE = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;

const title = "webapp name";
const description = "webapp name";
const icon = "/favicon.ico";
const imageUrl = "";
const imageType = "image/png";
const siteName = "webapp name";

const images = {
    url: imageUrl,
    type: imageType,
};

export const appMetadata: Metadata = {
    title,
    description,
    icons: {
        icon,
    },
    openGraph: {
        title,
        description,
        images,
        siteName,
        type: "website",
    },
    twitter: {
        title,
        description,
        images,
        card: "summary_large_image",
    },
};

export const SCREENS = {
    mobile: 412,
    tablet: 820,
    laptop: 1240,
    desktop: 1500,
};
