import { ProductService } from '../../service';
import { Injectable } from '@nestjs/common';
import { OrderHandler, OrderInfo } from '../model/Order';
@Injectable()
export class OrderService {
  constructor(private buildeableService: ProductService) {}

  async buildOrderHandler(info: OrderInfo) {
    const product = await this.buildeableService.getProductById(info.productId);
    const handler = new OrderHandler();
    handler.addProduct(product);
    for (const el of info.options) {
      const parent = await this.buildeableService.getOptionById(el.id);
      for (const id of el.options) {
        const subOption = await this.buildeableService.getOptionById(id);
        handler.addOption(parent, subOption);
      }
    }
    handler.setMetadata(info.metadata);
    return handler;
  }
}
