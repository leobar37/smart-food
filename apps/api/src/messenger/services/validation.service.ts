import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class ValidationWebhook {
  constructor(private readonly configService: ConfigService) {}
  validate(req: Request): boolean {
    const token = this.configService.get('FACEBOOK_VERIFY_TOKEN');
    const remoteTokenIsPresent = req?.query && !!req?.query['hub.verify_token'];
    const remoteTokenIsCorrect =
      remoteTokenIsPresent && req?.query['hub.verify_token'] === token;
    if (remoteTokenIsCorrect) {
      return (req.query as any)['hub.challenge'];
    }
    throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
  }
}
