import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Base URL for the API
export const BASE_URL = process.env.BASE_URL!;

// Authentication credentials
export const AUTH_USERNAME = process.env.AUTH_USERNAME!;
export const AUTH_PASSWORD = process.env.AUTH_PASSWORD!;