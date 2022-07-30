export type OptionSelection = {
  id: string;
  options: string[];
};

export const enum DeliveryTypeEnum {
  SEDE = 'sede',
  DELIVERY = 'delivery',
}
export interface OrderMetadata {
  deliveryDetails: {
    deliveryType: DeliveryTypeEnum.DELIVERY;
    name: string;
    lastName: string;
    phone?: string;
    direction: string | null;
    reference?: string;
    sede?: string | null;
  };
}
