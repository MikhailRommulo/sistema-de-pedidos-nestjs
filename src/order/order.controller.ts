import { JwtAuthGuard } from './../auth/shared/jwt-auth.guard';
import { ProductsOfOrderService } from './../products-of-order/products-of-order.service';
import { Order } from './../models/order.entity';
import { Controller, UseInterceptors, Get, Param, UseGuards } from '@nestjs/common';
import { Crud, CrudRequestInterceptor, Override, ParsedRequest, CrudRequest, ParsedBody, CrudController } from '@nestjsx/crud';
import { OrderService } from './order.service';
import { ProductsOfOrder } from 'src/models/productsOfOrder.entity';

@Crud({
    model: {
        type: Order
    },
    routes: {
        only: ['createOneBase', 'getOneBase', 'getManyBase', 'updateOneBase', 'replaceOneBase', 'deleteOneBase']
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
    ) { }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(CrudRequestInterceptor)
    @Get(':id/items')
    getProductsOfOrder(@Param('id') id: string): Promise<ProductsOfOrder[]> {
        return this.productsOfOrderService.find({
            where: {
                order: {
                    id: id
                }
            }
        })
    }

    get base(): CrudController<Order> {
        return this;
    }

    @UseGuards(JwtAuthGuard)
    @Override()
    getMany(
        @ParsedRequest() req: CrudRequest,
    ) {
        return this.base.getManyBase(req);
    }

    @UseGuards(JwtAuthGuard)
    @Override('getOneBase')
    getOneAndDoStuff(
        @ParsedRequest() req: CrudRequest,
    ) {
        return this.base.getOneBase(req);
    }

    @UseGuards(JwtAuthGuard)
    @Override()
    createOne(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: Order,
    ) {
        return this.base.createOneBase(req, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Override('updateOneBase')
    coolFunction(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: Order,
    ) {
        return this.base.updateOneBase(req, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Override('replaceOneBase')
    awesomePUT(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: Order,
    ) {
        return this.base.replaceOneBase(req, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Override()
    async deleteOne(
        @ParsedRequest() req: CrudRequest,
    ) {
        return this.base.deleteOneBase(req);
    }
}
