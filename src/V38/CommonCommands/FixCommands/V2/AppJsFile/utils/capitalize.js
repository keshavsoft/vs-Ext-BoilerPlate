// src/V1/utils/capitalize.js

export function capitalizeFirstLetter(value) {
    if (!value) return value;

    return value.charAt(0).toUpperCase() + value.slice(1);
}