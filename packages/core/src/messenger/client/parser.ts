import { Injectable } from '@nestjs/common';

import {
  FacebookMessagePayload,
  FacebookMessagePayloadMessagingEntry,
} from '../interfaces';

@Injectable()
export class FacebookParser {
  parsePayload(payload: FacebookMessagePayload) {
    if (
      payload.hasOwnProperty('object') &&
      payload.object === 'page' &&
      typeof payload.entry !== 'undefined'
    ) {
      return this.flattenPayload(payload.entry);
    }
    console.error('Invalid/Unknown Facebook Message Event.', { payload });
    return [];
  }
  private flattenPayload(
    payload: any[],
  ): FacebookMessagePayloadMessagingEntry[] {
    return payload.reduce((flat, toFlatten) => {
      return flat.concat(
        Array.isArray(toFlatten)
          ? this.flattenPayload(toFlatten)
          : Array.isArray(toFlatten.messaging)
          ? this.flattenPayload(toFlatten.messaging)
          : toFlatten,
      );
    }, []);
  }
}
