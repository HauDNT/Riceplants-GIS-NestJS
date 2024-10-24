import { IsNotEmpty, IsNumber, IsEmail, IsString, Length, IsBoolean, IsStrongPassword, IsOptional } from "class-validator";
import { Warehouse } from "../../warehouses/warehouse.entity";

export class CreateStaffDTO {
    @IsString()
    @IsNotEmpty({ message: 'Họ tên nhân viên không được để trống' })
    @Length(3, 100, { message: 'Họ tên nhân viên phải có độ dài từ 3 đến 100 ký tự' })
    Fullname: string;

    @IsEmail()
    @IsNotEmpty({ message: 'Email nhân viên không được để trống' })
    @Length(3, 100, { message: 'Email nhân viên phải có độ dài từ 3 đến 100 ký tự' })
    Email: string;

    @IsString()
    @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
    @Length(10, 10, { message: 'Số điện thoại phải có độ dài 10 ký tự' })
    PhoneNumber: string;

    @IsString()
    @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
    @Length(8, 20, { message: 'Mật khẩu phải có độ dài từ 8 đến 20 ký tự' })
    Password: string;

    @IsBoolean()
    @IsNotEmpty({ message: 'Giới tính không hợp lệ' })
    Gender: boolean;

    @IsString()
    @IsNotEmpty({ message: 'Địa chỉ không được để trống' })
    @Length(5, 300, { message: 'Địa chỉ phải có độ dài từ 5 đến 300 ký tự' })
    Address: string;

    @IsNumber()
    warehouse: Warehouse;
}