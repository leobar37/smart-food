import {
  FacebookMessageHandover,
  FacebookMessageOptin,
  FacebookMessagePayloadAccountLinking,
  FacebookMessagePayloadCheckoutUpdate,
  FacebookMessagePayloadDelivery,
  FacebookMessagePayloadGame,
  FacebookMessagePayloadMessageEntry,
  FacebookMessagePayloadMessagingEntry,
  FacebookMessagePayloadPayment,
  FacebookMessagePayloadPolicyEnforcement,
  FacebookMessagePayloadPostback,
  FacebookMessagePayloadPreCheckout,
  FacebookMessagePayloadRead,
  FacebookMessagePayloadReferral,
  FacebookMessagePayloadStandbyChannel,
} from '../interfaces';
import { MessengerEvent } from '../enums';
import { isNil } from 'lodash';
export class Message implements FacebookMessagePayloadMessagingEntry {
  sender: { id: string };
  recipient: { id: string };
  timestamp: number;
  message?: FacebookMessagePayloadMessageEntry;
  account_linking?: FacebookMessagePayloadAccountLinking;
  checkout_update?: FacebookMessagePayloadCheckoutUpdate;
  delivery?: FacebookMessagePayloadDelivery;
  game_play?: FacebookMessagePayloadGame;
  pass_thread_control?: FacebookMessageHandover;
  optin?: FacebookMessageOptin;
  payment?: FacebookMessagePayloadPayment;
  'policy-enforcement': FacebookMessagePayloadPolicyEnforcement;
  postback?: FacebookMessagePayloadPostback;
  payment_pre_checkout?: FacebookMessagePayloadPreCheckout;
  read?: FacebookMessagePayloadRead;
  referral?: FacebookMessagePayloadReferral;
  standby?: FacebookMessagePayloadStandbyChannel[];

  messageType() {
    switch (true) {
      case !isNil(this.message) &&
        (isNil(this.message?.is_echo) || !this.message.is_echo):
        return MessengerEvent.MESSAGE;
      case !isNil(this.standby):
        return MessengerEvent.STANDBY;
      case !isNil(this.postback):
        return MessengerEvent.POSTBACK;
      case !isNil(this.optin):
        return MessengerEvent.OPTIN;
      // the same for delivery
      case !isNil(this.delivery):
        return MessengerEvent.MESSAGE_DELIVERED;
      // the same for read
      case !isNil(this.read):
        return MessengerEvent.MESSAGE_READ;
      // the same for echo
      case !isNil(this.message?.is_echo) && this.message?.is_echo:
        return MessengerEvent.MESSAGE_ECHO;
      case !isNil(this.account_linking):
        return MessengerEvent.ACCOUNT_LINKING;
      case !isNil(this.checkout_update):
        return MessengerEvent.CHECKOUT_UPDATE;
      case !isNil(this.payment):
        return MessengerEvent.PAYMENTS;
      case !isNil(this.read):
        return MessengerEvent.MESSAGE_READ;
      case !isNil(this.referral):
        return MessengerEvent.REFERRAL;
      default:
        return MessengerEvent.UNKNOWN;
    }
  }
  payload() {
    switch (this.messageType()) {
      case MessengerEvent.MESSAGE:
        return this.message?.quick_reply?.payload;
      case MessengerEvent.POSTBACK:
        return this.postback?.payload;
      case MessengerEvent.REFERRAL:
        return this.referral?.ref;
      default:
        return null;
    }
  }
}
