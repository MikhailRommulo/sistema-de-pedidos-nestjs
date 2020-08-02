import { JwtAuthGuard } from './../auth/shared/jwt-auth.guard';
import { UserDto } from './../models/DTO/user.dto';
import { 
  Controller,
  HttpException, 
  HttpStatus, 
  UseGuards 
} from '@nestjs/common';
import { 
  Crud,
  CrudRequest,
  Override,
  ParsedRequest,
  ParsedBody,
  CrudController 
} from '@nestjsx/crud';
import { UserService } from './user.service';
import { User } from 'src/models/user.entity';
import * as bcrypt from 'bcrypt';

@Crud({
    model: {
        type: User
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
    }
})
@Controller('users')
export class UserController{
    constructor(public service: UserService) { }

    @Override()
    async createOne(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() user: UserDto
    ): Promise<User | any> {
        if (user.password === user.confirmPassword) {
            let hashed = await bcrypt.hash(user.password, 10)
            user.password = hashed
            return this.service.createOne(req, user)
        } else {
            throw new HttpException('Senha e corfimação de senha não combinam!', HttpStatus.CONFLICT)
        }
    }

    get base(): CrudController<User> {
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
    @Override('updateOneBase')
    coolFunction(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: User,
    ) {
        return this.base.updateOneBase(req, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Override('replaceOneBase')
    awesomePUT(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: User,
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
