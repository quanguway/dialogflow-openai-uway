import { Controller, Get } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { AppService } from './app.service';

@Controller()
export class AppController {

  @Inject(AppService)
  private readonly appService: AppService

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
