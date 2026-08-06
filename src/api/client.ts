import { APIRequestContext, APIResponse } from "@playwright/test";
import { RequestOptions } from "@api/types/request-options";

export class ApiClient {
    constructor(private request: APIRequestContext) {}

    async get(
        url: string,
        options?: RequestOptions
    ): Promise<APIResponse> {
        return this.request.get(url, options);
    }

    async post(
        url: string,
        options?: RequestOptions
    ): Promise<APIResponse> {
        return this.request.post(url, options);
    }

    async put(
        url: string,
        options?: RequestOptions
    ): Promise<APIResponse> {
        return this.request.put(url, options);
    }

    async patch(
        url: string,
        options?: RequestOptions
    ): Promise<APIResponse> {
        return this.request.patch(url, options);
    }

    async delete(
        url: string,
        options?: RequestOptions
    ): Promise<APIResponse> {
        return this.request.delete(url, options);
    }
}