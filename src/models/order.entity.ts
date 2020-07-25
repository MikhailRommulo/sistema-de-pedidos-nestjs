import { User } from 'src/models/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, AfterLoad } from "typeorm";
import { ProductsOfOrder } from './productsOfOrder.entity';

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => User)
    user: User

    @OneToMany(() => ProductsOfOrder, productsOfOrder => productsOfOrder.order, {cascade: ['insert','remove','update'], eager: true})
    products: ProductsOfOrder[]

    total: number

    @AfterLoad()
    countTotal() {
        let tot: number = 0
        this.products.forEach( p => {
            tot += p.overall
        })
        this.total = parseFloat(tot.toFixed(2))
    }
}