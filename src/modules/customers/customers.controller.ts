import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Post,
    Put,
    UseGuards
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customer } from './customer.entity';
import { Create_UpdateCustomerDTO } from './dto/create_update-customer.dto';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { createErrorResponse, createSuccessResponse } from 'src/common/helper/response.helper';
import { JWTGuard } from '../auth/jwt/jwt-guard';

@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) { }

    @Get('all')
    @UseGuards(JWTGuard)
    async getAll(): Promise<ApiResponseDto<Customer[]>> {
        try {
            const customers = await this.customersService.getAll();
            return createSuccessResponse('Lấy danh sách khách hàng thành công.', customers);
        } catch (error) {
            throw new HttpException(createErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.toString(),
                'Lấy danh sách khách hàng thất bại!',
                error.message,
            ), HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

    @Get('deleted')
    @UseGuards(JWTGuard)
    async getCustomersDeleted(): Promise<ApiResponseDto<Customer[]>> {
        try {
            const customersDeleted = await this.customersService.getCustomersDeleted();

            return createSuccessResponse('Lấy khách hàng bị xoá thành công!', customersDeleted);
        } catch (error) {
            throw new HttpException(createErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.toString(),
                'Lấy khách hàng bị xoá thất bại!',
                error.message,
            ), HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

    @Post('create')
    @UseGuards(JWTGuard)
    async create(
        @Body() data: Create_UpdateCustomerDTO,
    ): Promise<ApiResponseDto<any>> {
        try {
            const newCustomer = await this.customersService.create(data);

            return createSuccessResponse('Thêm khách hàng mới thành công!', newCustomer);
        } catch (error) {
            throw new HttpException(createErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.toString(),
                'Thêm khách hàng mới thất bại!',
                error.message,
            ), HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

    @Put('update/:id')
    @UseGuards(JWTGuard)
    async update(
        @Param('id') id: number,
        @Body() data: Create_UpdateCustomerDTO,
    ): Promise<ApiResponseDto<any>> {
        try {
            const customerUpdated = await this.customersService.update(id, data);

            return createSuccessResponse('Cập nhật thông tin khách hàng thành công!', customerUpdated);
        } catch (error) {
            console.log(error);
            
            throw new HttpException(createErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.toString(),
                'Cập nhật thông tin khách hàng mới thất bại!',
                error.message,
            ), HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

    @Patch('soft-delete/:id')
    @UseGuards(JWTGuard)
    async softDelete(
        @Param('id') id: number,
    ): Promise<ApiResponseDto<any>> {
        try {
            await this.customersService.softDelete(id);
            return createSuccessResponse('Xoá khách hàng thành công');
        } catch (error) {
            throw new HttpException(createErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.toString(),
                'Xoá khách hàng thất bại!',
                error.message,
            ), HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

    @Patch('restore/:id')
    @UseGuards(JWTGuard)
    async restore(
        @Param('id') id: number,
    ): Promise<ApiResponseDto<any>> {
        try {
            await this.customersService.restore(id);
            return createSuccessResponse('Khôi phục khách hàng thành công');
        } catch (error) {
            throw new HttpException(createErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.toString(),
                'Khôi phục khách hàng thất bại!',
                error.message,
            ), HttpStatus.INTERNAL_SERVER_ERROR);
        };
    };

}
