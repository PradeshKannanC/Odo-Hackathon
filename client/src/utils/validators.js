export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isRequired = (value) => value !== undefined && value !== null && String(value).trim() !== "";

export const minLength = (value, length) => String(value || "").length >= length;
