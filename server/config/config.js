// ===============================
// PORT
// ===============================
process.env.PORT = process.env.PORT || 3000;

// ===============================
// Token Expiration
// ===============================
// 60 Secs
// 60 Mnts
// 24 Hrs
// 30 Days
process.env.TOKEN_EXPIRATION = 60 * 60 * 24 * 30;

// ===============================
// Token Seed
// ===============================
process.env.TOKEN_SEED = process.env.TOKEN_SEED || "this-is-the-secret-word";
