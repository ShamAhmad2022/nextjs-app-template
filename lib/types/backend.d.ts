declare module "backend" {
    type TGeneric<T> = T | null;

    type ListResponse<T> = {
        data: T[];
        message?: string;
        count?: number;
        status: TGeneric<boolean>;
        error: TGeneric<string>;
        content?: string | TrustedHTML;
        pagination: {
            count: number;
            next: TGeneric<number>;
            previous: TGeneric<number>;
        };
    };

    type ListPaginated<T> = {
        data: T[];
        message?: string;
        status: TGeneric<boolean>;
        error: TGeneric<string>;
        pagination: {
            count: number;
            next: TGeneric<number>;
            previous: TGeneric<number>;
        };
    };

    type ItemResponse<T> = {
        data: T;
        message?: string;
        status: TGeneric<boolean>;
        error: TGeneric<string>;
    };
}
