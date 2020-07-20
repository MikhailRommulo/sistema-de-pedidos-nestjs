import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from 'src/models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService extends TypeOrmCrudService<User>{
    constructor(@InjectRepository(User) userRepository) {
        super(userRepository)
    }
}
