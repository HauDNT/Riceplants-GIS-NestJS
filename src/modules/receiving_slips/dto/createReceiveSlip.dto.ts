import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateReceiveSlipDTO {
    @IsNumber()
    @IsNotEmpty({ message: 'Mã khách hàng không được bỏ trống' })
    customerId: number;

    @IsNumber()
    @IsNotEmpty({ message: 'Mã nhân viên không được bỏ trống' })
    staffId: number;

    @IsNumber()
    @IsNotEmpty({ message: 'Mã kho không được bỏ trống' })
    warehouseId: number;
}