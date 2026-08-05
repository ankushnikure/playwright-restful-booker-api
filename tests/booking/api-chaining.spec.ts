import { test, expect } from "@playwright/test";
import createBookingPayload from "@testdata/booking/create-booking.json";
import updateBookingPayload from "@testdata/booking/update-booking.json";
import partialUpdateBookingPayload from "@testdata/booking/partial-update-booking.json";
import {
    generateTimestamp,
    generateUniqueValue
} from "@utils/test-data";
import { getAuthToken } from "@utils/auth";

test('API Chaining - Create Booking', async ({ request }) => {

    const timestamp = generateTimestamp();

    const payload = structuredClone(createBookingPayload);

    payload.firstname = generateUniqueValue("John", timestamp);
    payload.lastname = generateUniqueValue("Doe", timestamp);
    payload.additionalneeds = generateUniqueValue("Breakfast", timestamp);

    const createResponse = await request.post(
        "https://restful-booker.herokuapp.com/booking",
        {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            data: payload
        }
    );

    expect(createResponse.status()).toBe(200);

    const createBody = await createResponse.json();
    console.log("Create Booking Response:", createBody);

    // Capture bookingId from POST response
    const bookingId = createBody.bookingid;

    console.log("Booking ID:", bookingId);

    // --------------------
    // API Chain Starts Here
    // --------------------

    // Retrieve the newly created booking using the bookingId returned by POST
    const getResponse = await request.get(
        `https://restful-booker.herokuapp.com/booking/${bookingId}`
    );

    expect(getResponse.status()).toBe(200);

    const getBody = await getResponse.json();
    console.log("Get Booking Response:", getBody);

    expect(getBody.firstname).toBe(payload.firstname);
    expect(getBody.lastname).toBe(payload.lastname);
    expect(getBody.totalprice).toBe(payload.totalprice);
    expect(getBody.depositpaid).toBe(payload.depositpaid);
    expect(getBody.additionalneeds).toBe(payload.additionalneeds);

    const token = await getAuthToken(request);
    console.log("Auth Token:", token);


    // --------------------
    // PUT request
    // --------------------

    const updatedPayload = structuredClone(updateBookingPayload);


    const updateTimestamp = generateTimestamp();

    updatedPayload.firstname = generateUniqueValue("UpdatedJohn", updateTimestamp);
    updatedPayload.lastname = generateUniqueValue("UpdatedDoe", updateTimestamp);
    updatedPayload.additionalneeds = generateUniqueValue("Lunch", updateTimestamp);

    const updateResponse = await request.put(
        `https://restful-booker.herokuapp.com/booking/${bookingId}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Cookie": `token=${token}`
            },
            data: updatedPayload
        }
    );
    expect(updateResponse.status()).toBe(200);
    const updateBody = await updateResponse.json();
    console.log("Update Booking Response:", updateBody);

    expect(updateBody.firstname).toBe(updatedPayload.firstname);
    expect(updateBody.lastname).toBe(updatedPayload.lastname);
    expect(updateBody.totalprice).toBe(updatedPayload.totalprice);
    expect(updateBody.depositpaid).toBe(updatedPayload.depositpaid);
    expect(updateBody.additionalneeds).toBe(updatedPayload.additionalneeds);

    // --------------------
    // Verify Updated Booking (GET)
    // --------------------

    const verifyUpdatedResponse = await request.get(
        `https://restful-booker.herokuapp.com/booking/${bookingId}`
    );

    expect(verifyUpdatedResponse.status()).toBe(200);

    const verifyUpdatedBody = await verifyUpdatedResponse.json();

    console.log("Verify Updated Booking Response:", verifyUpdatedBody);

    expect(verifyUpdatedBody.firstname).toBe(updatedPayload.firstname);
    expect(verifyUpdatedBody.lastname).toBe(updatedPayload.lastname);
    expect(verifyUpdatedBody.totalprice).toBe(updatedPayload.totalprice);
    expect(verifyUpdatedBody.depositpaid).toBe(updatedPayload.depositpaid);
    expect(verifyUpdatedBody.additionalneeds).toBe(updatedPayload.additionalneeds);

    // --------------------
    // PATCH Request
    // --------------------

    const patchPayload = structuredClone(partialUpdateBookingPayload);

    const patchTimestamp = generateTimestamp();

    patchPayload.firstname = generateUniqueValue("PatchedJohn", patchTimestamp);
    patchPayload.additionalneeds = generateUniqueValue("Dinner", patchTimestamp);

    const patchResponse = await request.patch(
        `https://restful-booker.herokuapp.com/booking/${bookingId}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Cookie": `token=${token}`
            },
            data: patchPayload
        }
    );

    expect(patchResponse.status()).toBe(200);

    const patchBody = await patchResponse.json();

    console.log("Patch Booking Response:", patchBody);

    expect(patchBody.firstname).toBe(patchPayload.firstname);
    expect(patchBody.additionalneeds).toBe(patchPayload.additionalneeds);

    // Unchanged fields should remain the same after PATCH
    expect(patchBody.lastname).toBe(updatedPayload.lastname);
    expect(patchBody.totalprice).toBe(updatedPayload.totalprice);
    expect(patchBody.depositpaid).toBe(updatedPayload.depositpaid);

    // --------------------
    // Verify Patched Booking (GET)
    // --------------------

    const verifyPatchedResponse = await request.get(
        `https://restful-booker.herokuapp.com/booking/${bookingId}`
    );

    expect(verifyPatchedResponse.status()).toBe(200);
    const verifyPatchedBody = await verifyPatchedResponse.json();
    console.log("Verify Patched Booking Response:", verifyPatchedBody);

    expect(verifyPatchedBody.firstname).toBe(patchPayload.firstname);
    expect(verifyPatchedBody.additionalneeds).toBe(patchPayload.additionalneeds);
    expect(verifyPatchedBody.lastname).toBe(updatedPayload.lastname);
    expect(verifyPatchedBody.totalprice).toBe(updatedPayload.totalprice);
    expect(verifyPatchedBody.depositpaid).toBe(updatedPayload.depositpaid);

    // --------------------
    // DELETE Request
    // --------------------

    const deleteResponse = await request.delete(
        `https://restful-booker.herokuapp.com/booking/${bookingId}`,
        {
            headers: {
                "Cookie": `token=${token}`
            }
        }
    );

    expect(deleteResponse.status()).toBe(201);
    console.log("Delete Booking Response: Booking deleted successfully");

    // --------------------
    // Verify Booking Deletion (GET)
    // --------------------

    const verifyDeleteResponse = await request.get(
        `https://restful-booker.herokuapp.com/booking/${bookingId}`
    );

    expect(verifyDeleteResponse.status()).toBe(404);
    console.log("Verify Delete Response: Booking not found (404)");
})