import { PAYMENT_METHODS } from '../../common/constants';
import { PaymentMethods } from '../../common/types';
import { messageUtils } from '../../common/utils';
import { Product, Option, SubOption } from '@smartfood/client';
export interface Metadata {
  direction: string;
  pickUpPerson: string;
  phone: string;
  note: string;
  paymentMethod: PaymentMethods;
}

export interface OrderInfo {
  productId: string;
  options: { id: string; options: string[] }[];
  metadata: Metadata;
}

export class OrderHandler {
  productId: string;
  optionsRaw: Map<string, SubOption[]>;
  parentOption: Map<string, Option>;
  selectedProduct: Product;
  senderId: string;
  metadata: Metadata;
  quantity: number;
  constructor() {
    this.optionsRaw = new Map();
    this.parentOption = new Map();
  }
  setMetadata(metadata: Partial<Metadata>) {
    this.metadata = { ...this.metadata, ...metadata };
  }

  addProduct(pr: Product) {
    this.selectedProduct = pr;
  }
  addOption(parentOption: Option, selected: SubOption) {
    const options = this.optionsRaw.get(parentOption.id);
    if (!options) {
      this.parentOption.set(parentOption.id, parentOption);
      this.optionsRaw.set(parentOption.id, [selected]);
    } else {
      options.push(selected);
    }
  }

  paymentMethodMessage() {
    const method = PAYMENT_METHODS.find(
      (el) => el.value === this.metadata.paymentMethod,
    );
    return messageUtils.format('**Forma de pago:**', '', `➖ ${method.label}`);
  }

  serializeOrder() {
    const data = {
      metadata: {
        direction: this.metadata.direction,
        payment: this.metadata.paymentMethod,
        phone: this.metadata.phone,
      },
    };
    return data;
  }

  serializeOrderLine() {
   
    const options = Array.from(this.parentOption.values()).map((opt) => {
      const options = this.optionsRaw.get(opt.id);
      return {
        id: opt.id,
        options: options ? options.map((o) => o.id) : [],
      };
    });

    return {
      orderLine: {
        productId: this.selectedProduct.id,
        quantity: this.quantity,
        selection:
          options.length > 0
            ? {
                options: options,
              }
            : {},
      },
    };
  }

  shippingAddressMessage() {
    return messageUtils.format(
      '**Datos de envió:**',
      '',
      `➖Dirección:`,
      this.metadata.direction,
      `➖Nombre de la persona que lo recoge:`,
      this.metadata.pickUpPerson,
      `➖Numero de telefono:`,
      this.metadata.phone,
      `➖¿Alguna nota para su pedido?`,
      this.metadata.note,
    );
  }

  reset(){
    
  }

  orderResumeMessage() {
    const messages = [];
    messages.push(`**Resumen de pedido:**`);
    if (this.selectedProduct) {
      messages.push('');
      messages.push(`Producto: ${this.selectedProduct.name}`);
      messages.push('');
    }
    if (this.optionsRaw.size > 0) {
      messages.push(`*Selección:*`);
      messages.push('');
      const optionsMessages = Array.from(this.optionsRaw.entries())
        .map(([id, options]) => {
          const parent = this.parentOption.get(id);
          return [
            `✔ ${parent.name}:`,
            '',
            options.map((opt) => `- ${opt.name}`).join('\n'),
            '',
          ];
        })
        .flat();
      messages.push(...optionsMessages);
    }
    return messageUtils.format(...messages);
  }
  toMessage() {
    return messageUtils.format(
      messageUtils.separator,
      this.orderResumeMessage(),
      messageUtils.separator,
      this.shippingAddressMessage(),
      messageUtils.separator,
      this.paymentMethodMessage(),
      messageUtils.separator,
    );
  }
}
