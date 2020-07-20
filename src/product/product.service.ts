import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { Product } from 'src/models/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService extends TypeOrmCrudService<Product> {
    constructor(@InjectRepository(Product) userRepository) {
        super(userRepository);
    }
}
