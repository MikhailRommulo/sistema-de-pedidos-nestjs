import { ProductService } from './product.service';
import { Product } from './../models/product.entity';
import { Crud } from '@nestjsx/crud';
import { Controller } from '@nestjs/common';

@Crud({
    model: {
        type: Product
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true
        }
    }
})
@Controller('product')
export class ProductController {
    constructor(public service: ProductService) {}
}
