import { IndexService } from './index.service';
import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller('site')
export class IndexController {
  constructor(private readonly service: IndexService) {}

  @Get('/statics')
  @HttpCode(200)
  async getBasicInfo(): Promise<any> {
    return await this.service.getSiteStatics();
  }
}
