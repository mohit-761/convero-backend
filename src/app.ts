import express from 'express';
import authRouter from './router/auth.router';
import userRouter from './router/user.router';
import passwordRouter from './router/password.router';
import { errorHandler } from './middleware/error-handler.middleware';
import path from 'path';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(process.cwd(), '/uploads')));

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/password', passwordRouter);

// last middlware in the stack for error handling
app.use(errorHandler);

export default app;