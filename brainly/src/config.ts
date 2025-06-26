// src/config.ts or wherever you like
import dotenv from "dotenv";
dotenv.config();  // loads .env variables into process.env

export const MONGO_URL = process.env.MONGO_URL || "";
export const JWT_Password = process.env.JWT_SECRET || "fallback_secret";
