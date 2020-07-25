import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({length: 90})
    description: string

    @Column({type: 'real', nullable: true})
    price: number
}