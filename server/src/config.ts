import env from "dotenv";
env.config({ path: "./.env" });

export const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:3000";