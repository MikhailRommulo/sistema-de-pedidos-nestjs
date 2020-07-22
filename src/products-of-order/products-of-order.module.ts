import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductsOfOrderService } from './products-of-order.service';
import { ProductsOfOrder } from 'src/models/productsOfOrder.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsOfOrder])],
  providers: [ProductsOfOrderService]
})
export class ProductsOfOrderModule {}
