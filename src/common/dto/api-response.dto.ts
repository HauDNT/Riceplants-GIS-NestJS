import { IsString, IsOptional, IsObject, IsDateString } from 'class-validator';

export class ApiResponseDto<T> {
    @IsString()
    status: 'success' | 'error';

    @IsString()
    message: string;

    @IsOptional()
    @IsObject()
    payload?: T;

    @IsOptional()
    @IsObject()
    error?: {
        code: string;
        details?: any;
    };

    @IsDateString()
    timestamp: string;
}