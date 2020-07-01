import { LinkDto } from './../../Dto/link.dto';
import { Request } from 'express';
import { LinkService } from './link.service';
import {
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { Link } from 'src/Model/link.schema';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Get('/getAllLinks')
  @HttpCode(200)
  async getAllLinks(): Promise<Array<Link>> {
    return await this.linkService.getAllLinks();
  }

  @Post('/addLink')
  @HttpCode(200)
  async addLink(@Body() linkDto: LinkDto): Promise<Link> {
    return await this.linkService.addLink(linkDto);
  }

  @Get('/deleteLink')
  @HttpCode(200)
  async deleteLink(@Query() _id): Promise<any> {
    return await this.linkService.deleteLink(_id);
  }
}
