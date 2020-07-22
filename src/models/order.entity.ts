import { User } from 'src/models/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column } from "typeorm";
import { ProductsOfOrder } from './productsOfOrder.entity';

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => User)
    user: User

    @OneToMany(() => ProductsOfOrder, productsOfOrder => productsOfOrder.order, {cascade: ['insert','remove','update'], eager: true})
    products: ProductsOfOrder[]

    @Column({type: 'money', nullable: true})
    total: number
}