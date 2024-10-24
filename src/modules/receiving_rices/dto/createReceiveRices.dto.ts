import { IsArray, IsNotEmpty, IsNumber } from "class-validator";
import { RiceDTO } from "./rice.dto";

export class CreateReceiveRicesDTO {
    @IsNumber()
    @IsNotEmpty({ message: 'Mã đơn nhận không được bỏ trống' })
    receiveSlipId: number;

    @IsArray()
    @IsNotEmpty({ message: 'Danh sách lúa của hoá đơn không được bỏ trống' })
    listRices: RiceDTO[];
}