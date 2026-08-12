import { APIRequestContext } from "@playwright/test";
import { BASE_URL } from "@config/env";
import { ENDPOINTS } from "@api/endpoints/endpoints";
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

    const authBody: AuthResponse = await response.json();

    if (!response.ok() || !authBody.token) {
        throw new Error(
            `Authentication failed: ${response.status()}`
        );
    }

    const body: AuthResponse = await response.json();
    return body.token;
}