import { JwtAuthGuard } from './auth/shared/jwt-auth.guard';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { ProductsOfOrderModule } from './products-of-order/products-of-order.module';
import { APP_GUARD, Reflector } from '@nestjs/core';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(),
    UserModule,
    ProductModule,
    OrderModule,
    ProductsOfOrderModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useFactory: ref => new JwtAuthGuard(ref),
      inject: [Reflector],
    },
  ],
})
export class AppModule { }
