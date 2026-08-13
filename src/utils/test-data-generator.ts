import { faker } from "@faker-js/faker";

/**
 * Generates a unique timestamp for the current test execution.
 */
export function generateTimestamp(): number {
    return Date.now();
}

/**
 * Appends a unique identifier to the provided value.
 */
export function generateUniqueValue(value: string, uniqueId: number): string {
    return `${value}_${uniqueId}`;
}

/**
 * Generates a unique first name.
 */
export function generateFirstName(uniqueId?: number): string {
    const firstName = faker.person.firstName();

    return uniqueId !== undefined
        ? `${firstName}_${uniqueId}`
        : firstName;
}