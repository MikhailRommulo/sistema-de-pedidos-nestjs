import { AuthService } from './shared/auth.service';
import { Controller, UseGuards, Post, Request } from '@nestjs/common';
import { LocalAuthGuard } from './shared/local-auth.guard';
import { AllowAny } from 'src/custom-decorators/allow-any.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @AllowAny()
    @UseGuards(LocalAuthGuard)
    async login(@Request() req: any) {
        return this.authService.login(req.user);
    }
}
