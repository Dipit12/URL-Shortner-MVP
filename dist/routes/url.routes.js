import express from 'express';
import { generateShortenedURL } from '../controllers/url.controller.js';
import { routeToLongURL } from '../controllers/url.controller.js';
const router = express.Router();
router.post("/api/v1/urls/shorten", generateShortenedURL);
router.get("/api/v1/urls/:shortenURL", routeToLongURL);
export default router;
