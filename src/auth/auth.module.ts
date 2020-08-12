import { jwtConstants } from './shared/constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './shared/jwt.strategy';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './shared/local.strategy';
import { UserService } from './../user/user.service';
import { User } from './../models/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './shared/auth.service';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1d'},            
        }),
    ],
    controllers: [
        AuthController,],
    providers: [
        AuthService,
        UserService,
        LocalStrategy,
        JwtStrategy
    ],
})
export class AuthModule { }
