import { APIRequestContext, APIResponse } from "@playwright/test";
import { RequestOptions } from "@api/types/request-options.types";

export class ApiClient { // ← ONLY generic HTTP methods

    // Initialize ApiClient with Playwright's API request context
    constructor(private request: APIRequestContext) { }

    // Send a GET request
    async get(url: string, options?: RequestOptions): Promise<APIResponse> {
        return this.request.get(url, options);
    }

    // Send a POST request
    async post(url: string, options?: RequestOptions): Promise<APIResponse> {
        return this.request.post(url, options);
    }

    // Send a PUT request
    async put(url: string, options?: RequestOptions): Promise<APIResponse> {
        return this.request.put(url, options);
    }

     // Send a PATCH request
    async patch(url: string, options?: RequestOptions): Promise<APIResponse> {
        return this.request.patch(url, options);
    }

    // Send a DELETE request
    async delete(url: string, options?: RequestOptions): Promise<APIResponse> {
        return this.request.delete(url, options);
    }

    // Parse API response JSON and return it as the specified TypeScript type
    // <T> allows the caller to define the expected response type
    async parseJsonResponse<T>(response: APIResponse): Promise<T> {
        return await response.json() as T;
    }
}