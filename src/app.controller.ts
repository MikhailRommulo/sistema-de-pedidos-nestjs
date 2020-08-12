import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AllowAny } from './custom-decorators/allow-any.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @AllowAny()
  getHello(): string {
    return this.appService.getHello();
  }
}
