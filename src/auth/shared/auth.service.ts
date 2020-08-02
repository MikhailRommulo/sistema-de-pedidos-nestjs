import { UserService } from './../../user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(userEmail: string, userPassword: string) {
        const user = await this.userService.findOne({where: {
            email: userEmail
        }})
        const passwordTrue = await bcrypt.compare(userPassword, user.password) 
        if (user && passwordTrue) {
            const { id, name, email} = user
            return { id, name, email}
        }

        return null
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
