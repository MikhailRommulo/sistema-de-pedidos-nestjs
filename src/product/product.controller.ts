import { ProductService } from './product.service';
import { Product } from './../models/product.entity';
import { Crud, Override, ParsedRequest, CrudRequest, ParsedBody, CrudController, CreateManyDto } from '@nestjsx/crud';
import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';

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
@Controller('products')
export class ProductController {
    constructor(public service: ProductService) { }

    get base(): CrudController<Product> {
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
        @ParsedBody() dto: Product,
    ) {
        return this.base.createOneBase(req, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Override()
    createMany(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: CreateManyDto<Product>
    ) {
        return this.base.createManyBase(req, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Override('updateOneBase')
    coolFunction(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: Product,
    ) {
        return this.base.updateOneBase(req, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Override('replaceOneBase')
    awesomePUT(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: Product,
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
