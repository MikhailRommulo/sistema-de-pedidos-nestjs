import { ProductService } from './../product/product.service';
import { Product } from './../models/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductsOfOrderService } from './products-of-order.service';
import { ProductsOfOrder } from 'src/models/productsOfOrder.entity';
import { ProductsOfOrderSubscriber } from 'src/observables/productsOfOrder.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsOfOrder, Product])],
  providers: [ProductsOfOrderService, ProductsOfOrderSubscriber, ProductService]
})
export class ProductsOfOrderModule {}
