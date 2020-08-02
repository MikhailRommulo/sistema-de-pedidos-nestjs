import { User } from '../user.entity';

export class UserDto extends User {
    confirmPassword: string
}