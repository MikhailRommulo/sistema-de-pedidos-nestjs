import { UserDto } from './../models/DTO/user.dto';
import { Controller, Post, Req, Body, HttpException, HttpStatus } from '@nestjs/common';
import { Crud, CrudRequest, Override, ParsedRequest, ParsedBody } from '@nestjsx/crud';
import { UserService } from './user.service';
import { User } from 'src/models/user.entity';
import * as bcrypt from 'bcrypt';

@Crud({
    model: {
        type: User
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
    }
})
@Controller('users')
export class UserController {
    constructor(public service: UserService) {}
    
    @Override()
    async createOne(@ParsedRequest() req: CrudRequest, @ParsedBody() user: UserDto): Promise<User | any> {
       if (user.password === user.confirmPassword) {
         let hashed = await bcrypt.hash(user.password, 10)
         user.password = hashed
         return this.service.createOne(req, user)
       } else {
           throw new HttpException('Senha e corfimação de senha não combinam!', HttpStatus.CONFLICT)
       }
    } 
}
