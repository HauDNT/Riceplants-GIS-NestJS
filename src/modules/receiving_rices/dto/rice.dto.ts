import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class RiceDTO {
    @IsNumber()
    @IsNotEmpty({ message: 'Mã lúa không được bỏ trống' })
    id: number;

    @IsNumber()
    @IsNotEmpty({ message: 'Số lượng không được bỏ trống' })
    Amount: number;

    @IsNumber()
    @IsNotEmpty({ message: 'Đơn giá không được bỏ trống' })
    UnitPrice: number;
}