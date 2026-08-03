import { test, expect } from "playwright/test"; 

test('HealthCheck', async ({request}) => {
    const response = await request.get('https://restful-booker.herokuapp.com/ping');
    expect(response.status()).toBe(201);
})