import { Entity,
         ManyToOne,
         Column,
         PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { Order } from "./order.entity";

@Entity()
export class ProductsOfOrder {    
    @PrimaryGeneratedColumn()
    public readonly id: number;
    
    @ManyToOne(() => Order, order => order.products, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    order: Order

    @ManyToOne(() => Product, {cascade: true, eager: true})
    product: Product

    @Column({type: 'integer'})
    amount: number

    @Column({type: 'real'})
    overall: number
}