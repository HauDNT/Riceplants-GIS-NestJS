import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class CreateWarehouseDTO {
    @IsString()
    @IsNotEmpty({ message: 'Tên kho không được để trống' })
    @Length(3, 100, { message: 'Tên kho phải có độ dài từ 3 đến 100 ký tự' })
    Name: string;
    
    @IsString()
    @IsNotEmpty({ message: 'Địa chỉ không được để trống' })
    @Length(3, 200, { message: 'Tên kho phải có độ dài từ 3 đến 200 ký tự' })
    Address: string;

    @IsNumber()
    @IsNotEmpty({ message: 'Vĩ độ không được để trống' })
    Latitude: number;

    @IsNumber()
    @IsNotEmpty({ message: 'Kinh độ không được để trống' })
    Longitude: number;
}