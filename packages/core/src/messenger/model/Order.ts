import { PAYMENT_METHODS } from '../../common/constants';
import { PaymentMethods, BuildeableProduct, Option } from '../../common/types';
import { messageUtils } from '../../common/utils';
export interface Metadata {
  direction: string;
  pickUpPerson: string;
  phone: string;
  note: string;
  paymentMethod: PaymentMethods;
}

export interface OrderInfo {
  productId: number;
  options: { id: number; options: number[] }[];
  metadata: Metadata;
}

export class OrderHandler {
  productId: string;
  optionsRaw: Map<number, Option[]>;
  parentOption: Map<number, Option>;
  selectedProduct: BuildeableProduct;
  senderId: string;
  metadata: Metadata;
  constructor() {
    this.optionsRaw = new Map();
    this.parentOption = new Map();
  }
  setMetadata(metadata: Partial<Metadata>) {
    this.metadata = { ...this.metadata, ...metadata };
  }

  addProduct(pr: BuildeableProduct) {
    this.selectedProduct = pr;
  }
  addOption(parentOption: Option, selected: Option) {
    const options = this.optionsRaw.get(parentOption.id);
    if (!options) {
      this.parentOption.set(parentOption.id, parentOption);
      this.optionsRaw.set(parentOption.id, [selected]);
    } else {
      options.push(selected);
    }
  }

  paymentMethodMessage() {
    const method = PAYMENT_METHODS.selection.find(
      (el) => el.id === this.metadata.paymentMethod,
    );
    return messageUtils.format('**Forma de pago:**', '', `➖ ${method.label}`);
  }

  serialize(): OrderInfo {
    const data = {
      productId: this.selectedProduct.id,
      options: Array.from(this.parentOption.values()).map((opt) => {
        const options = this.optionsRaw.get(opt.id);
        return {
          id: opt.id,
          options: options ? options.map((o) => o.id) : [],
        };
      }),
      metadata: this.metadata,
    };
    return data;
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
