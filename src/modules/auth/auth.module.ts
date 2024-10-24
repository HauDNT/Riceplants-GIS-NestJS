import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWTStrategy } from './jwt/jwt-strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { StaffsModule } from '../staffs/staffs.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        StaffsModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configServe: ConfigService) => ({
                secret: configServe.get<string>('secret_key'),
                signOptions: {
                    expiresIn: '1d',
                },
            }),
            inject: [ConfigService]
        })
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JWTStrategy,
    ],
})
export class AuthModule { }
