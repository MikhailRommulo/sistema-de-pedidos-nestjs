import { ProductsOfOrder } from '../models/productsOfOrder.entity';
import { ProductService } from '../product/product.service';
import { EventSubscriber, EntitySubscriberInterface, Connection, InsertEvent } from 'typeorm';

@EventSubscriber()
export class ProductsOfOrderSubscriber implements EntitySubscriberInterface<ProductsOfOrder> {
    constructor(
      connection: Connection,
      private productService: ProductService) 
      {
        connection.subscribers.push(this)
      }
    
    async beforeInsert(event: InsertEvent<ProductsOfOrder>) {
      let product = await this.productService.findOne(event.entity.product)
      let overall = product.price * event.entity.amount
      event.entity.overall = parseFloat(overall.toFixed(2))
    }
}