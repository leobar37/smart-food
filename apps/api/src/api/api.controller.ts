import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
@Controller()
export class ApiController {
  constructor() {}
  @Get('/')
  async helloWorld(@Res() res: Response) {
    res.send(`<h1>hello bot</h1>`);
  }
}
