import express from 'express';
import healthRouter from './routes/health.routes.js';
import dotenv from 'dotenv';
import urlRouter from './routes/url.routes.js';
import analysticsRouter from './routes/analytics.routes.js';
import { connectToMongo } from './utils/mongoDBconnection.js';
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3001;
app.use(express.json());
await connectToMongo();
app.use(healthRouter);
app.use(urlRouter);
app.use(analysticsRouter);
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

