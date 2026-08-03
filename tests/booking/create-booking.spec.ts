import { test, expect } from "playwright/test"; 

test('Booking - CreateBooking', async ({ request }) => {
    const response = await request.post('https://restful-booker.herokuapp.com/booking', {
        headers: {
            'Content-Type': "application/json",
            'Accept': "application/json"
        },
        data: {
            firstname: 'test',
            lastname: 'user',
            totalprice: 241,
            depositpaid: true,
            bookingdates: { checkin: '2019-07-06', checkout: '2024-04-11' },
            additionalneeds: 'coding'
        }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(body);
})