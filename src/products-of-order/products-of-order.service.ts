import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { ProductsOfOrder } from 'src/models/productsOfOrder.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsOfOrderService extends TypeOrmCrudService<ProductsOfOrder> {
    constructor(@InjectRepository(ProductsOfOrder) productsOfOrderRepository) {
        super(productsOfOrderRepository)        
    }
}
