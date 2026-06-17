export class ApiError extends Error {
    public statusCode: number;
    public data: unknown;
    constructor(statusCode: number, message: string, data: unknown = null, stack: string = '') {
        super(message);
        this.statusCode = statusCode;
        this.data = data;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}