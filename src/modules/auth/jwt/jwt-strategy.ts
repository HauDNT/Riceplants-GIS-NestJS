import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWTPayloadType } from "./jwt-payload-type";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configServe: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configServe.get<string>('secret_key'),
        });
    };

    async validate(payload: JWTPayloadType) {
        return {
            userId: payload.userId,
            email: payload.email,
            phoneNumber: payload.phoneNumber,
        };
    };
}

