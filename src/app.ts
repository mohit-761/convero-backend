import express from 'express';
import authRouter from './router/auth.router';
import { errorHandler } from './middleware/error-handler.middleware';
import userRouter from './router/user.router';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// last middlware in the stack for error handling
app.use(errorHandler);

export default app;