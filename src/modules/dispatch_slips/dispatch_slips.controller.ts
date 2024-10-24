import { Body, Controller, Get, HttpException, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { DispatchSlipsService } from './dispatch_slips.service';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { createErrorResponse, createSuccessResponse } from 'src/common/helper/response.helper';
import { JWTGuard } from '../auth/jwt/jwt-guard';
import { CreateDispatchSlipDTO } from './dto/createDispatchSlip.dto';
import { DispatchSlip } from './dispatch_slip.entity';

@Controller('dispatch-slips')
export class DispatchSlipsController {
    constructor(private readonly dispatchSlipsService: DispatchSlipsService) {}

    @UseGuards(JWTGuard)
    @Get()
    async getByPage(
        @Query('page') page: number,
        @Query('limit') limit: number = 10,
    ): Promise<ApiResponseDto<{ billInfo: DispatchSlip; totalBill: number; }[]>> {
        try {
            const bills = await this.dispatchSlipsService.getByPage(page, limit);
            return createSuccessResponse('Lấy dữ liệu hoá đơn xuất kho thành công', bills);
        } catch (error) {
            throw new HttpException(createErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.toString(),
                'Lấy dữ liệu hoá đơn xuất kho thất bại!',
                error.message,
            ), HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

    @UseGuards(JWTGuard)
    @Get('amount')
    async getAmount(): Promise<ApiResponseDto<number>> {
        try {
            const amount = await this.dispatchSlipsService.getAmount();
            return createSuccessResponse('Lấy số lượng hoá đơn xuất kho thành công', amount);
        } catch (error) {
            throw new HttpException(createErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.toString(),
                'Lấy số lượng hoá đơn xuất kho thất bại!',
                error.message,
            ), HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

    @UseGuards(JWTGuard)
    @Get('amount-by-range-days')
    async getAmountByRangeDays(
        @Query('timeStart') timeStart: string,
        @Query('timeEnd') timeEnd: string,
    ): Promise<ApiResponseDto<any>> {
        try {
            const amount = await this.dispatchSlipsService.getAmountByRangeDays(timeStart, timeEnd);
            return createSuccessResponse('Lấy số lượng hoá đơn xuất theo ngày thành công', amount);
        } catch (error) {
            throw new HttpException(createErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.toString(),
                'Lấy số lượng hoá đơn xuất theo ngày thất bại!',
                error.message,
            ), HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

    @UseGuards(JWTGuard)
    @Get('amount-by-range-days-id')
    async getAmountByRangeDaysId(
        @Query('id') id: number,
        @Query('timeStart') timeStart: string,
        @Query('timeEnd') timeEnd: string,
    ): Promise<ApiResponseDto<any>> {
        try {
            const amount = await this.dispatchSlipsService.getAmountByRangeDaysId(id, timeStart, timeEnd);
            return createSuccessResponse(`Lấy số lượng hoá đơn xuất theo ngày của kho ${id} thành công`, amount);
        } catch (error) {
            throw new HttpException(createErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.toString(),
                `Lấy số lượng hoá đơn xuất theo ngày của kho ${id} thất bại!`,
                error.message,
            ), HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

    @UseGuards(JWTGuard)
    @Post('create')
    async create(
        @Body() data: CreateDispatchSlipDTO,
    ): Promise<ApiResponseDto<DispatchSlip>> {
        try {
            const receiveRices = await this.dispatchSlipsService.create(data);
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
