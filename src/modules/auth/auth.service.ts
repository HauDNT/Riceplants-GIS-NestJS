import { Injectable, UnauthorizedException } from '@nestjs/common';
import { StaffsService } from '../staffs/staffs.service';
import { LoginDTO } from './dto/login.dto';
import { UserDataReponse } from './dto/userDataResponse.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JWTPayloadType } from './jwt/jwt-payload-type';

@Injectable()
export class AuthService {
    constructor(
        private staffService: StaffsService,
        private jwtService: JwtService,
    ) { }

    async login(data: LoginDTO): Promise<UserDataReponse> {
        const isEmail = data.username.includes("@");
        const staff = await this.staffService.findOneByUsername(data.username, isEmail);
        const passwordMatched = await bcrypt.compare(data.password, staff.Password);

        if (passwordMatched) {
            // Send JWT Token
            const payload: JWTPayloadType = {
                userId: staff.id,
                email: staff.Email,
                phoneNumber: staff.PhoneNumber,
            };

            return {
                userId: staff.id,
                fullname: staff.Fullname,
                email: staff.Email,
                phoneNumber: staff.PhoneNumber,
                accessToken: this.jwtService.sign(payload),
            }
        }

        throw new UnauthorizedException("Tài khoản không tồn tại!");
    }
}
