import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { BACKEND_BASE } from "@/lib/constants";
import { ItemResponse, ListPaginated, ListResponse } from "backend";
import { Locale } from "app";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// type BodyType = Record<string, string> | FormData | { [key: string | number]: any };

type AxiosWrapperType<GenericRes> = {
    data: GenericRes;
};

class AxiosClient<GenericReq, GenericRes = object> {
    endpoint: string;
    instance: AxiosInstance;
    headers: Record<string, string>;

    constructor({
        endpoint,
        isToken = false,
        contentType = "multipart/form-data",
        locale = "en",
        // sendTimeZone = false,
        baseURL = BACKEND_BASE,
    }: {
        endpoint: string;
        contentType?: "multipart/form-data" | "application/json" | "application/octet-stream";
        isToken?: boolean;
        baseURL?: string;
        // sendTimeZone?: boolean;
        locale?: Locale;
    }) {
        const axiosInstance = axios.create({
            baseURL,
        });

        axiosInstance.interceptors.request.use((config) => {
            if (isToken) {
                const accessToken = localStorage.getItem("access");
                accessToken && (config.headers["Authorization"] = `Bearer ${accessToken}`);
            }

            config.headers["Content-Type"] = contentType;
            config.headers["Accept-Language"] = locale;

            // if (sendTimeZone) config.headers["Time-Zone"] = "Asia/Amman";

            return config;
        });

        this.endpoint = endpoint;
        this.instance = axiosInstance;
        this.headers = {};
    }

    private combineConfig = (config?: AxiosRequestConfig): AxiosRequestConfig => ({
        ...config,
        headers: { ...this.headers, ...config?.headers },
    });

    getItem = async (config?: AxiosRequestConfig) =>
        await this.instance
            .get<GenericReq, AxiosWrapperType<ItemResponse<GenericRes>>>(
                this.endpoint,
                this.combineConfig(config),
            )
            .then((res) => res.data);

    getList = async (config?: AxiosRequestConfig) =>
        await this.instance
            .get<GenericReq, AxiosWrapperType<ListResponse<GenericRes>>>(
                this.endpoint,
                this.combineConfig(config),
            )
            .then((res) => res.data);

    getPaginated = async (config?: AxiosRequestConfig) =>
        await this.instance
            .get<GenericReq, AxiosWrapperType<ListPaginated<GenericRes>>>(
                this.endpoint,
                this.combineConfig(config),
            )
            .then((res) => res.data);

    post = async (body?: GenericReq, config?: AxiosRequestConfig) =>
        await this.instance
            .post<GenericReq, AxiosWrapperType<GenericRes>>(
                this.endpoint,
                body,
                this.combineConfig(config),
            )
            .then((res) => res.data);

    put = async (body?: GenericReq, config?: AxiosRequestConfig) =>
        await this.instance
            .put<GenericReq, AxiosWrapperType<GenericRes>>(
                this.endpoint,
                body,
                this.combineConfig(config),
            )
            .then((res) => res.data);

    delete = async (config?: AxiosRequestConfig) =>
        await this.instance
            .delete<GenericReq, AxiosWrapperType<GenericRes>>(
                this.endpoint,
                this.combineConfig(config),
            )
            .then((res) => res.data);
}

export default AxiosClient;
