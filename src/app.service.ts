import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {
      version: 1.0,
      description: 'Sistema simples de pedidos'
    };
  }
}
