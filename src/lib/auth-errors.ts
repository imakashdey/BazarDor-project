type AuthError = {
  code?: string;
  message?: string;
};

const BANGLA_BY_CODE: Record<string, string> = {
  INVALID_EMAIL_OR_PASSWORD: "ইমেইল বা পাসওয়ার্ড ভুল। আবার চেষ্টা করুন।",
  INVALID_EMAIL: "ইমেইল ঠিকানাটি সঠিক নয়।",
  INVALID_PASSWORD: "পাসওয়ার্ডটি সঠিক নয়।",
  PASSWORD_TOO_SHORT: "পাসওয়ার্ডটি খুব ছোট। কমপক্ষে ৮ অক্ষর দিন।",
  PASSWORD_TOO_LONG: "পাসওয়ার্ডটি খুব বড়।",
  VALIDATION_ERROR: "ফর্মের তথ্য সঠিক নয়। আবার চেষ্টা করুন।",
  TOO_MANY_REQUESTS: "অনেকবার চেষ্টা করা হয়েছে। কিছুক্ষণ পরে আবার চেষ্টা করুন।",
  USER_ALREADY_EXISTS: "এই ইমেইল দিয়ে ইতিমধ্যে অ্যাকাউন্ট আছে।",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL:
    "এই ইমেইল দিয়ে ইতিমধ্যে অ্যাকাউন্ট আছে। অন্য ইমেইল ব্যবহার করুন।",
  EMAIL_NOT_VERIFIED: "ইমেইলটি এখনো যাচাই হয়নি।",
  MISSING_OR_NULL_ORIGIN: "অনুরোধটি অনুমোদিত নয়। আবার চেষ্টা করুন।",
  INVALID_ORIGIN: "অনুরোধটি অনুমোদিত নয়। আবার চেষ্টা করুন।",
};

export function getAuthErrorMessage(
  error: unknown,
  fallback = "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।"
): string {
  const { code, message } = (error ?? {}) as AuthError;

  if (code && BANGLA_BY_CODE[code]) {
    return BANGLA_BY_CODE[code];
  }

  const normalized = String(message ?? "").toLowerCase();
  if (normalized.includes("invalid email or password")) {
    return BANGLA_BY_CODE.INVALID_EMAIL_OR_PASSWORD;
  }
  if (normalized.includes("invalid email")) {
    return BANGLA_BY_CODE.INVALID_EMAIL;
  }
  if (normalized.includes("invalid password")) {
    return BANGLA_BY_CODE.INVALID_PASSWORD;
  }
  if (normalized.includes("too many requests")) {
    return BANGLA_BY_CODE.TOO_MANY_REQUESTS;
  }
  if (normalized.includes("already exists")) {
    return BANGLA_BY_CODE.USER_ALREADY_EXISTS;
  }

  return fallback;
}
