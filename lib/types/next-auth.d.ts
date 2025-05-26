// * override the Session type in next-auth to extend its attributes

import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session extends DefaultSession {
        expires: string;
        user: {
            username: string;
            callbackUrl: string;
            country: string;
            csrfToken: string;
            email: string;
            first_name: string;
            id: string;
            is_subscribed: boolean;
            is_verified: boolean;
            json: boolean;
            subscription_end_date: string;
            last_name: string;
            mobile_details: {
                id: string;
                dialling_code: string;
                local_number: string;
            };
            redirect: boolean;

            exp?: number;
            iat?: number;
            jti?: string;
            invite_code: string;
        };
        tokens: {
            access?: string;
            refresh?: string;
        };
    }
}
