import { ApiResponseDto } from "../dto/api-response.dto";

function createSuccessResponse<T>(message: string, data?: T): ApiResponseDto<T> {
    return {
        status: 'success',
        message,
        payload: data,
        timestamp: new Date().toISOString(),
    };
}

function createErrorResponse(code: string, message: string, details?: any): ApiResponseDto<null> {
    return {
        status: 'error',
        message,
        error: {
            code,
            details,
        },
        timestamp: new Date().toISOString(),
    };
}

export { createSuccessResponse, createErrorResponse };