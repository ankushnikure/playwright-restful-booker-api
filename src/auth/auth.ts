import { APIRequestContext } from "@playwright/test";
import { ENDPOINTS } from "@api/endpoints/endpoints";
import { BASE_URL } from "@config/env";
import { AuthResponse } from "@api/types/auth.types";

export async function getAuthToken(request: APIRequestContext): Promise<string> {

    // Send authentication request
    const response = await request.post(
        `${BASE_URL}${ENDPOINTS.AUTH}`,
        {
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                username: "admin",
                password: "password123"
            }
        }
    );

    const body: AuthResponse = await response.json();
    return body.token;
}