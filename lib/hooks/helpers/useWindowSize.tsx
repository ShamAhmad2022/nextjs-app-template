"use client";

import { SCREENS } from "@/lib/constants";
import { ScreenType } from "app";
import { useEffect, useMemo, useState } from "react";

export const useWindowSize = () => {
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        function updateSize() {
            setSize({ width: window.innerWidth, height: window.innerHeight });
        }
        window.addEventListener("resize", updateSize);
        updateSize();

        return () => window.removeEventListener("resize", updateSize);
    }, []);

    const currentScreen: ScreenType = useMemo(() => {
        if (size?.width > SCREENS?.desktop) return "desktop";
        else if (size?.width > SCREENS?.laptop) return "laptop";
        else if (size?.width > SCREENS?.tablet) return "tablet";
        else return "mobile";
    }, [size]);

    const isSmallDevice = useMemo(
        () => ["mobile", "tablet"].includes(currentScreen),
        [currentScreen],
    );

    return {
        viewportWidth: size.width,
        viewportHeight: size.height,
        currentScreen,
        isSmallDevice,
    };
};
