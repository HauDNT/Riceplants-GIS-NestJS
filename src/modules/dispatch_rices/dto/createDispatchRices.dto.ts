import { IsArray, IsNotEmpty, IsNumber } from "class-validator";
import { RiceDTO } from "./rice.dto";

export class CreateDispatchRicesDTO {
    @IsNumber()
    @IsNotEmpty({ message: 'Mã đơn xuất không được bỏ trống' })
    dispatchSlipId: number;

    @IsArray()
    @IsNotEmpty({ message: 'Danh sách lúa của hoá đơn không được bỏ trống' })
    listRices: RiceDTO[];
}