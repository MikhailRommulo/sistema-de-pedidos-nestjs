import { ProductsOfOrderService } from './../products-of-order/products-of-order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { Order } from 'src/models/order.entity';
import { OrderService } from './order.service';
import { ProductsOfOrder } from 'src/models/productsOfOrder.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, ProductsOfOrder])],
  controllers: [OrderController],
  providers: [OrderService, ProductsOfOrderService]
})
export class OrderModule {}
