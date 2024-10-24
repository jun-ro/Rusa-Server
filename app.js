import express from 'express';
import { rateLimit } from 'express-rate-limit';
import { slowDown } from 'express-slow-down';
import { User } from "./models/User.js";

import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js'

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
});

const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000,
    delayAfter: 1,
    delayMs: () => 1000,
})

// Setup User database.

User.init('./test.db')
await User.sync()

// Middleware

app.use(speedLimiter)
app.use(limiter)
app.use(express.json());

// Routes

app.use('/api', userRoutes);
app.use('/api', authRoutes)

export default app;
