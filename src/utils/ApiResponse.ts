export class ApiResponse<T> {
    // public success: number;
    public message: string;
    public statusCode: number;
    public data: T | null;
    constructor(statusCode: number, message: string, data: T | null = null) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}