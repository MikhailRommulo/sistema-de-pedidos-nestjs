import { Entity,
         Column,
         PrimaryGeneratedColumn} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({length: 65})
    name: string

    @Column({length: 65})
    email: string

    @Exclude({ toPlainOnly: true })
    @Column({length: 60})
    password: string
}
