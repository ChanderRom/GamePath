import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User, UserSchema } from "../schemas/user.schema";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        configService: ConfigService,
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }
    async validate(payload: any): Promise<User> {
        const { id } = payload;

        console.log(id.toString())
        const user = await this.userModel.findOne({ id });

        if (!user)
            throw new UnauthorizedException('Invalid token');

        if (!user.isActive)
            throw new UnauthorizedException('Invalid user');

        return user;
    }
}