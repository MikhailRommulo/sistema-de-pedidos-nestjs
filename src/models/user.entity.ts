import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserRoles } from './enums/userRoles';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({length: 65})
    name: string

    @Column({length: 65})
    email: string

    @Column({type: 'enum', enum: UserRoles, default: UserRoles.NORMAL })
    role: UserRoles

    @Exclude({ toPlainOnly: true })
    @Column({length: 60})
    password: string
}
