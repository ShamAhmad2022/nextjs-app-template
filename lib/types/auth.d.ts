declare module "auth" {
    type SignUpObject = {
        first_name: string;
        last_name: string;
        email: string;
        mobile_number: string;
        mobile_country_code_id: string;
        username: string;
        country: string;
        termsAndPrivacyAgreement: string;
        password: string;
    };

    type LoginObject = {
        tokens: {
            refresh: string;
            access: string;
        };
        profile: {
            id: string;
            first_name: string;
            last_name: string;
            mobile_details: {
                id: string;
                dialling_code: string;
                local_number: string;
            };
            country: string;
            email: string;
            username: string;
            is_verified: boolean;
            is_subscribed: boolean;
            subscription_end_date: string;
            invite_code: string;
        };
    };
}
