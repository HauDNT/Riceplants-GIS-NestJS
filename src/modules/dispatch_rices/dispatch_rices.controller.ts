import { Body, Controller, Get, HttpException, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { DispatchRicesService } from './dispatch_rices.service';
import { JWTGuard } from '../auth/jwt/jwt-guard';
import { CreateDispatchRicesDTO } from './dto/createDispatchRices.dto';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { createErrorResponse, createSuccessResponse } from 'src/common/helper/response.helper';

@Controller('dispatch-rices')
export class DispatchRicesController {
    constructor(private readonly dispatchRicesService: DispatchRicesService) { }

    @UseGuards(JWTGuard)
    @Get('amount-by-type')
    async getAmountByTypeRices(): Promise<ApiResponseDto<any[]>> {
        try {
            const amountTypes = await this.dispatchRicesService.getAmountByTypeRices();
            return createSuccessResponse('Lấy số lượng lúa theo loại hiện có trong kho xuất thành công', amountTypes);
        } catch (error) {
            throw new HttpException(createErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.toString(),
                'Lấy số lượng lúa theo loại hiện có trong kho xuất thất bại!',
                error.message,
            ), HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

    @UseGuards(JWTGuard)
    @Get('amount-by-type-warehouseId-rangedays')
    async getAmountByTypeRicesAndWarehouseId(
        @Query('warehouseId') warehouseId: number,
        @Query('timeStart') timeStart: string,
        @Query('timeEnd') timeEnd: string,
    ): Promise<ApiResponseDto<any[]>> {
        try {
            const amountTypes = await this.dispatchRicesService.getAmountByTypeRicesAndWarehouseId(warehouseId, timeStart, timeEnd);
            return createSuccessResponse('Lấy số lượng lúa theo loại hiện có trong kho xuất thành công', amountTypes);
        } catch (error) {
            throw new HttpException(createErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.toString(),
                'Lấy số lượng lúa theo loại hiện có trong kho xuất thất bại!',
                error.message,
            ), HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

    @UseGuards(JWTGuard)
    @Post('create')
    async create(
        @Body() data: CreateDispatchRicesDTO,
    ): Promise<ApiResponseDto<boolean>> {
        try {
            const receiveRices = await this.dispatchRicesService.create(data);
            return createSuccessResponse('Tạo hoá đơn xuất thành công', receiveRices);
        } catch (error) {
            throw new HttpException(createErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.toString(),
                'Tạo hoá đơn xuất thất bại!',
                error.message,
            ), HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };
}
