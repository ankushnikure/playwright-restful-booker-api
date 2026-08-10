export const bookingData = [
    {
        testCase: "Valid Booking",
        firstname: "John",
        lastname: "Doe",
        totalprice: 241,
        depositpaid: true,
        additionalneeds: "Breakfast",
        expectedStatus: 200
    },
    {
        testCase: "Empty First Name",
        firstname: "",
        lastname: "Doe",
        totalprice: 241,
        depositpaid: true,
        additionalneeds: "Breakfast",
        expectedStatus: 200
    },
    {
        testCase: "Empty Last Name",
        firstname: "John",
        lastname: "",
        totalprice: 241,
        depositpaid: true,
        additionalneeds: "Breakfast",
        expectedStatus: 200
    }
];