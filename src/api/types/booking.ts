
// BookingDates represents check-in and check-out dates
export interface BookingDates {
    checkin: string;
    checkout: string;
}

// Booking represents the structure of a booking request and booking object
export interface Booking {
    firstname: string;
    lastname: string;
    totalprice: number;
    depositpaid: boolean;
    bookingdates: BookingDates;
    additionalneeds: string;
}

// CreateBookingResponse represents the structure of complete response returned after successfully creating a booking
export interface CreateBookingResponse {
    bookingid: number;
    booking: Booking;
}