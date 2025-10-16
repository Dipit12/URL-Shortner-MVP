import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();
if (!process.env.REDIS_URL) {
    throw new Error("❌ REDIS_URL not found in environment variables");
}
// Create a single shared Redis client
export const redisClient = new Redis(process.env.REDIS_URL);
redisClient.on("connect", () => {
    console.log("✅ Connected to Redis successfully");
});
redisClient.on("error", (err) => {
    console.error("❌ Redis connection error:", err);
});
