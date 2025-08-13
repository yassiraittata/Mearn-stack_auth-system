// 1) Check for empty value
export function isEmpty(value) {
  return String(value || "").trim().length === 0;
}

// 2) Check for minimum length
export function hasMinLength(value, minLength) {
  return String(value || "").trim().length >= minLength;
}

// 3) Check for email format
export function isValidEmail(email) {
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return EMAIL_RE.test(String(email).trim());
}
