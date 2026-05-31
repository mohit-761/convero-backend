export class ApiResponse<T> {
    public message: string;
    public statusCode: number;
    public data: T | null;
    constructor(statusCode: number, message: string, data: T | null = null) {
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
    }
}