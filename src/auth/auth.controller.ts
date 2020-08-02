import { AuthService } from './shared/auth.service';
import { Controller, UseGuards, Post, Request } from '@nestjs/common';
import { LocalAuthGuard } from './shared/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req: any) {
        return this.authService.login(req.user);
    }
}
