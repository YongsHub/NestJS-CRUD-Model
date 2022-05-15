import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository : UserRepository,
        private jwtService : JwtService
    ){}

    async signUp(authCredentialsDto : AuthCredentialsDto): Promise<void> {
        return this.userRepository.createUser(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        const { username, password } = authCredentialsDto;
        const user = await this.userRepository.findOne({username}); // 먼저 DB에서 username을 찾음

        if(user && await bcrypt.compare(password, user.password)){ // user가 존재하고 password와 user.password가 실제로 일치한다면
            // 유저 토큰 생성(secret + payload)
            const payload = { username }
            const accessToken = await this.jwtService.sign(payload);
            return { accessToken };
        }else{
            throw new UnauthorizedException('login failed');
        }
    }
}
