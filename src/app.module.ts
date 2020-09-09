import { ProductsOfOrder } from './models/productsOfOrder.entity';
import { Order } from './models/order.entity';
import { Product } from './models/product.entity';
import { JwtAuthGuard } from './auth/shared/jwt-auth.guard';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { ProductsOfOrderModule } from './products-of-order/products-of-order.module';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { User } from './models/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
    TypeOrmModule.forRoot({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPORM_HOST,
      port: Number(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      synchronize: true,
      logging: true,
      entities: [User, Product, Order, ProductsOfOrder]
    }),
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
