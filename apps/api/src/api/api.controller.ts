import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { CoreService } from '@smartfood/core';
@Controller()
export class ApiController {
  constructor(private coreService: CoreService) {}
  @Get('/')
  async helloWorld(@Res() res: Response) {
    res.send(`<h1>${this.coreService.ping()}</h1>`);
  }
}
