import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ReceivingSlipsService } from './receiving_slips.service';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { ReceivingSlip } from './receiving_slip.entity';
import { CreateReceiveSlipDTO } from './dto/createReceiveSlip.dto';
import { createErrorResponse, createSuccessResponse } from 'src/common/helper/response.helper';
import { JWTGuard } from '../auth/jwt/jwt-guard';

@Controller('receiving-slips')
export class ReceivingSlipsController {
    constructor(private readonly receivingSlipsService: ReceivingSlipsService) { }

    @UseGuards(JWTGuard)
    @Get()
    async getByPage(
        @Query('page') page: number,
        @Query('limit') limit: number = 10,
    ): Promise<ApiResponseDto<{ billInfo: ReceivingSlip; totalBill: number; }[]>> {
        try {
            const bills = await this.receivingSlipsService.getByPage(page, limit);
            return createSuccessResponse('Lấy dữ liệu hoá đơn nhập kho thành công', bills);
        } catch (error) {
            throw new HttpException(createErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.toString(),
                'Lấy dữ liệu hoá đơn nhập kho thất bại!',
                error.message,
            ), HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

    @UseGuards(JWTGuard)
    @Get('amount')
    async getAmount(): Promise<ApiResponseDto<number>> {
        try {
            const amount = await this.receivingSlipsService.getAmount();
            return createSuccessResponse('Lấy số lượng hoá đơn nhập kho thành công', amount);
        } catch (error) {
            throw new HttpException(createErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.toString(),
                'Lấy số lượng hoá đơn nhập kho thất bại!',
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
            const amount = await this.receivingSlipsService.getAmountByRangeDays(timeStart, timeEnd);
            return createSuccessResponse('Lấy số lượng hoá đơn nhập theo ngày thành công', amount);
        } catch (error) {
            throw new HttpException(createErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.toString(),
                'Lấy số lượng hoá đơn nhập theo ngày thất bại!',
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
            const amount = await this.receivingSlipsService.getAmountByRangeDaysId(id, timeStart, timeEnd);
            return createSuccessResponse(`Lấy số lượng hoá đơn nhập theo ngày của kho ${id} thành công`, amount);
        } catch (error) {
            throw new HttpException(createErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.toString(),
                `Lấy số lượng hoá đơn nhập theo ngày của kho ${id} thất bại!`,
                error.message,
            ), HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

    @UseGuards(JWTGuard)
    @Post('create')
    async create(
        @Body() data: CreateReceiveSlipDTO,
    ): Promise<ApiResponseDto<ReceivingSlip>> {
        try {
            const receiveBill = await this.receivingSlipsService.create(data);
            return createSuccessResponse('Tạo hoá đơn nhận thành công', receiveBill);
        } catch (error) {
            throw new HttpException(createErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.toString(),
                'Tạo hoá đơn nhận thất bại!',
                error.message,
            ), HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };
}
