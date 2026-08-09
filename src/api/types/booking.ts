
// Booking represents the structure of the booking request and booking object returned by the API
export interface Booking {
    firstname: string;
    lastname: string;
    totalprice: number;
    depositpaid: boolean;
    bookingdates: {
        checkin: string;
        checkout: string;
    };
    additionalneeds: string;
}

// CreateBookingResponse represents the structure of complete response returned after successfully creating a booking
export interface CreateBookingResponse {
    bookingid: number;
    booking: Booking;
}