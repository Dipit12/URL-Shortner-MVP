import { customAlphabet } from "nanoid";
import { redisClient } from "../utils/redisConnection.js";
import URLModel from "../models/URLSchema.js";
// ======================
// Controller: Create Short URL
// ======================
export const generateShortenedURL = async (req, res) => {
    const { longURL } = req.body;
    if (!longURL) {
        return res.status(400).json({
            msg: "Please provide a long URL",
        });
    }
    // generate short ID
    const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", 10);
    const shortURL = nanoid(7);
    try {
        // store in MongoDB
        await URLModel.create({
            shortURL,
            longURL,
        });
        // also cache it in Redis
        await redisClient.set(shortURL, longURL);
        return res.status(200).json({
            msg: "Short URL created successfully",
            shortURL,
            longURL,
        });
    }
    catch (err) {
        console.error("MongoDB Error:", err);
        return res.status(500).json({
            msg: "Error saving data in MongoDB",
        });
    }
};
// ======================
// Controller: Redirect Route
// ======================
export const routeToLongURL = async (req, res) => {
    const { shortenURL } = req.params;
    if (!shortenURL) {
        return res.status(400).json({ msg: "Please provide the short URL" });
    }
    try {
        // check Redis
        const cached = await redisClient.get(shortenURL);
        if (cached) {
            console.log("Cache hit");
            return res.redirect(cached);
        }
        // check MongoDB
        const urlDoc = await URLModel.findOne({ shortenURL });
        if (urlDoc) {
            await redisClient.set(shortenURL, urlDoc.longURL);
            await URLModel.updateOne({ shortenURL }, { $push: { timeStamps: { timeStamps: new Date() } } });
            return res.redirect(urlDoc.longURL);
        }
        return res.status(404).json({ msg: "Short URL not found" });
    }
    catch (err) {
        console.error("Error resolving short URL:", err);
        return res.status(500).json({ msg: "Error redirecting URL" });
    }
};
