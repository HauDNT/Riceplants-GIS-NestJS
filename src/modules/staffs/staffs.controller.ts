import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { Staff } from './staff.entity';
import { StaffsService } from './staffs.service';
import { JWTGuard } from '../auth/jwt/jwt-guard';
import { CreateStaffDTO } from './dto/createStaff.dto';
import { UpdateStaffDTO } from './dto/updateStaff.dto';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { createErrorResponse, createSuccessResponse } from 'src/common/helper/response.helper';

@Controller('staffs')
@UseInterceptors(ClassSerializerInterceptor)
export class StaffsController {
    constructor(private readonly staffsService: StaffsService) { }

    @Get('all')
    @UseGuards(JWTGuard)
    async getAll(): Promise<ApiResponseDto<Staff[]>> {
        try {
            const staffs = await this.staffsService.getAll();
            return createSuccessResponse('Lấy danh sách nhân viên thành công.', staffs);
        } catch (error) {
            throw new HttpException(createErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.toString(),
                'Lấy danh sách nhân viên thất bại!',
                error.message,
            ), HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

    @Get('details/:id')
    @UseGuards(JWTGuard)
    getDetail(
        @Param(
            'id',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
        ) id: number,
    ): Promise<Staff> {
        return this.staffsService.getDetail(id);
    };

    @Get('deleted')
    @UseGuards(JWTGuard)
    getStaffsDeleted(): Promise<Staff[]> {
        return this.staffsService.getStaffsDeleted();
    };

    @Get('amount')
    @UseGuards(JWTGuard)
    async getAmount(): Promise<ApiResponseDto<number>> {
        try {
            const amount = await this.staffsService.getAmount();
            return createSuccessResponse('Lấy số lượng nhân viên thành công', amount);
        } catch (error) {
            throw new HttpException(createErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.toString(),
                'Lấy số lượng nhân viên thất bại!',
                error.message,
            ), HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

    @Post('create')
    @UseGuards(JWTGuard)
    async create(
        @Body() data: CreateStaffDTO,
    ): Promise<ApiResponseDto<Staff>> {
        try {
            const newStaff = await this.staffsService.create(data);

            return createSuccessResponse('Thêm nhân viên mới thành công!', newStaff);
        } catch (error) {
            throw new HttpException(createErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.toString(),
                'Thêm nhân viên mới thất bại!',
                error.message,
            ), HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };


    @Put('update/:id')
    async update(
        @Param('id') id: number,
        @Body() data: UpdateStaffDTO,
        @Res() response: Response,
    ): Promise<void> {
        try {
            const updateStatus = await this.staffsService.update(id, data);

            if (updateStatus) {
                response.status(HttpStatus.OK).json({
                    status: 'success',
                    message: 'Cập nhật thông tin nhân viên thành công.',
                });
            };

            response.status(HttpStatus.BAD_REQUEST).json({
                status: 'failed',
                message: 'Cập nhật thông tin nhân viên thất bại.',
            });
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Cập nhật thông tin nhân viên thất bại! Vui lòng thử lại sau.',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    @Patch('soft-delete/:id')
    @UseGuards(JWTGuard)
    async softDelete(
        @Param('id') id: number,
    ): Promise<{ message: string; }> {
        try {
            await this.staffsService.softDelete(id);
            return { message: 'Xoá nhân viên thành công! Nhân viên sẽ được đưa vào thùng rác trong 30 ngày' };
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Xoá nhân viên thất bại! Vui lòng thử lại sau.',
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        };
    };

    @Patch('restore/:id')
    @UseGuards(JWTGuard)
    async restore(
        @Param('id') id: number
    ): Promise<{ message: string; }> {
        try {
            await this.staffsService.restore(id);
            return { message: 'Khôi phục nhân viên thành công!' };
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Khôi phục nhân viên thất bại! Vui lòng thử lại sau.',
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        };
    };
}
