import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { ProductsOfOrderModule } from './products-of-order/products-of-order.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, ProductModule, OrderModule, ProductsOfOrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
