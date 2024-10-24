import { Controller, Get, HttpException, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { RiceplantsService } from './riceplants.service';
import { JWTGuard } from '../auth/jwt/jwt-guard';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { RicePlant } from './riceplant.entity';
import { createErrorResponse, createSuccessResponse } from 'src/common/helper/response.helper';

@Controller('riceplants')
export class RiceplantsController {
    constructor(private readonly riceplantsService: RiceplantsService) { }
    
    @Get('all')
    @UseGuards(JWTGuard)
    async getAll(): Promise<ApiResponseDto<RicePlant[]>> {
        try {
            const ricePlants = await this.riceplantsService.getAll();
            return createSuccessResponse('Lấy danh sách lúa thành công', ricePlants);
        } catch (error) {
            throw new HttpException(createErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.toString(),
                'Lấy danh sách lúa thất bại!',
                error.message,
            ), HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };  

    @Get()
    @UseGuards(JWTGuard)
    async getByPage(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<ApiResponseDto<RicePlant[]>> {
        try {
            const ricePlants = await this.riceplantsService.getByPage(page, limit);
            return createSuccessResponse('Lấy danh sách lúa thành công', ricePlants);
        } catch (error) {
            throw new HttpException(createErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.toString(),
                'Lấy danh sách lúa thất bại!',
                error.message,
            ), HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };
}
