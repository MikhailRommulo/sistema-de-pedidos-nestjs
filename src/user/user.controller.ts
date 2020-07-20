import { Controller, Post, Req, Body } from '@nestjs/common';
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
    async createOne(@ParsedRequest() req: CrudRequest, @ParsedBody() user: User): Promise<User> {
       let hashed = await bcrypt.hash(user.password, 10)
       user.password = hashed
       return this.service.createOne(req, user)
    } 
}
