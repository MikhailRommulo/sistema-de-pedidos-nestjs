import { ProductsOfOrderService } from './../products-of-order/products-of-order.service';
import { Order } from './../models/order.entity';
import { Controller, UseInterceptors, Get, Param } from '@nestjs/common';
import { Crud, ParsedRequest, CrudRequest, CrudRequestInterceptor } from '@nestjsx/crud';
import { OrderService } from './order.service';

@Crud({
    model: {
        type: Order
    },
    routes: {
        only: ['createOneBase','getOneBase','getManyBase','updateOneBase','replaceOneBase','deleteOneBase']
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true
        }
    },
    query: {
        join: {
            user: {
                eager: true,
                exclude: ['email', 'role']
            },
            products: {
                eager: true
            }
        }
    }
})
@Controller('orders')
export class OrderController {
    constructor(
        public service: OrderService,
        private productsOfOrderService: ProductsOfOrderService
        ) {}

    @UseInterceptors(CrudRequestInterceptor)
    @Get(':id/items')
    getProductsOfOrder(@ParsedRequest() req: CrudRequest, @Param('id') id: string) {
        return this.productsOfOrderService.find({where: {
            order: id
        }})
    }
}
