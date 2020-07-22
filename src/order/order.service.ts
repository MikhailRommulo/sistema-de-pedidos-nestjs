import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { Order } from 'src/models/order.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderService extends TypeOrmCrudService<Order>{
    constructor(@InjectRepository(Order) orderRepository) {
        super(orderRepository);
    }
}
