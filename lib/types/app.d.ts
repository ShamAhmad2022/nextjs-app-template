declare module "app" {
    type StorePayload<PayloadType> = {
        payload: PayloadType;
    };

    type SocketPayload<PayloadType> = {
        data: PayloadType;
    };

    type Locale = (typeof i18n)["locales"][number];
    
    type TranslateObject = typeof ar | typeof en;

    type ScreenType = "mobile" | "tablet" | "laptop" | "desktop";
}
