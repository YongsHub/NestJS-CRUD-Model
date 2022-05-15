import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

@Injectable()
// 다른 곳에서도 사용할 수 있도록
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository : UserRepository
    ){
        super({
            secretOrKey: 'Taeyong5201', // 토큰이 유효한지 체크하기 위해 사용
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() // 토큰을 Header에서 BearerToken으로 가져와 유효한지 검사
        })
    }

    async validate(payload) {
        const { username } = payload;
        const user: User = await this.userRepository.findOne({ username });

        if(!user){
            throw new UnauthorizedException();
        }

        return user;
    }
}