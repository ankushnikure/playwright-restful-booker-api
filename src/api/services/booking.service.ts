import { APIResponse } from "@playwright/test";

import { ApiClient } from "@api/client";
import { BASE_URL } from "@config/env";
import { ENDPOINTS } from "@api/endpoints";
import { BookingPayload } from "@api/types/booking";
import { RequestOptions } from "@api/types/request-options";

export class BookingService {

    constructor(private apiClient: ApiClient) {}

    async createBooking(
        payload: BookingPayload
    ): Promise<APIResponse> {

        return this.apiClient.post(
            `${BASE_URL}${ENDPOINTS.BOOKING}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                data: payload
            }
        );
    }

    async getBooking(
        bookingId: number
    ): Promise<APIResponse> {

        return this.apiClient.get(
            `${BASE_URL}${ENDPOINTS.BOOKING}/${bookingId}`
        );
    }

    async getBookingIds(): Promise<APIResponse> {
        return this.apiClient.get(
            `${BASE_URL}${ENDPOINTS.BOOKING}`
        );
    }

    async updateBooking(
        bookingId: number,
        payload: BookingPayload,
        token: string
    ): Promise<APIResponse> {

        return this.apiClient.put(
            `${BASE_URL}${ENDPOINTS.BOOKING}/${bookingId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Cookie": `token=${token}`
                },
                data: payload
            }
        );
    }

    async partialUpdateBooking(
        bookingId: number,
        payload: Partial<BookingPayload>,
        token: string
    ): Promise<APIResponse> {

        return this.apiClient.patch(
            `${BASE_URL}${ENDPOINTS.BOOKING}/${bookingId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Cookie": `token=${token}`
                },
                data: payload
            }
        );
    }

    async deleteBooking(
        bookingId: number,
        token: string
    ): Promise<APIResponse> {

        return this.apiClient.delete(
            `${BASE_URL}${ENDPOINTS.BOOKING}/${bookingId}`,
            {
                headers: {
                    "Cookie": `token=${token}`
                }
            }
        );
    }

}