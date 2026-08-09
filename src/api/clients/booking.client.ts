import { APIResponse } from "@playwright/test";
import { ApiClient } from "@api/clients/api.client";
import { BASE_URL } from "@config/env";
import { ENDPOINTS } from "@api/endpoints/endpoints";
import { Booking } from "@api/types/booking.types";

export class BookingClient {

    constructor(private apiClient: ApiClient) { }

    async createBooking(payload: Booking): Promise<APIResponse> {
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

    async getBooking(bookingId: number): Promise<APIResponse> {
        return this.apiClient.get(
            `${BASE_URL}${ENDPOINTS.BOOKING}/${bookingId}`
        );
    }

    async getBookingIds(): Promise<APIResponse> {
        return this.apiClient.get(
            `${BASE_URL}${ENDPOINTS.BOOKING}`
        );
    }

    async updateBooking(bookingId: number, payload: Booking, token: string): Promise<APIResponse> {
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

    async partialUpdateBooking(bookingId: number, payload: Partial<Booking>, token: string): Promise<APIResponse> {
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

    async deleteBooking(bookingId: number, token: string): Promise<APIResponse> {
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