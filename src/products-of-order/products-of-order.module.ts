import { ProductModule } from './../product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductsOfOrderService } from './products-of-order.service';
import { ProductsOfOrder } from 'src/models/productsOfOrder.entity';
import { ProductsOfOrderSubscriber } from 'src/observables/productsOfOrder.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsOfOrder]), ProductModule],
  providers: [ProductsOfOrderService, ProductsOfOrderSubscriber],
  exports: [ProductsOfOrderService]
})
export class ProductsOfOrderModule {}
