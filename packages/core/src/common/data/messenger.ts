import { messageUtils } from '../utils';

export const confirmOrder = {
  messages: {
    cuestions: {
      direction: {
        text: 'Dejanos tu dirección',
        prop: 'direction',
      },
      pickUpPerson: {
        text: 'Nombre de la persona que lo recoge',
        prop: 'pickUpPerson',
      },
      phone: {
        text: 'Numero de telefono',
        prop: 'phone',
      },
      note: {
        text: '¿Alguna nota para su pedido?',
        prop: 'note',
      },
    },
  },
};

export const GET_SARTED = [
  messageUtils.format(
    'Hola bievenido a Smart Food.',
    '',
    'lo mejor para ti y tu salud',
  ),
  messageUtils.format(`Tenemos las siguientes opciones para ti`),
];

export const WORD_TO_ACTIVETE_MENU = ['opciones', 'menu', 'pedido'];

export const messengerData = {
  confirmOrder,
  GET_SARTED,
  WORD_TO_ACTIVETE_MENU,
};
