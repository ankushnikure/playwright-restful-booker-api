import { APIRequestContext, expect } from "@playwright/test";

export async function getAuthToken(request: APIRequestContext): Promise<string> {

    // Send authentication request
    const response = await request.post(
        "https://restful-booker.herokuapp.com/auth",
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
    expect(response.status()).toBe(200);
    const body = await response.json();
    return body.token;
}