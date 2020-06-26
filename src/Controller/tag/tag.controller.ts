import { Request } from 'express';
import { Controller, Post, HttpCode, Req, Get, Query } from '@nestjs/common';
import { TagService } from './tag.service';
import { Tag } from 'src/Model/tag.schema';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get('/addTag')
  @HttpCode(200)
  async addTag(@Query() query): Promise<Tag> {
    const { tagName } = query;
    return await this.tagService.addTag({ tagName });
  }

  @Get('/deleteTag')
  @HttpCode(200)
  async deleteTag(@Query() query): Promise<any> {
    const { _id, tagName } = query;
    return await this.tagService.deleteTag(_id, tagName);
  }

  @Get('/getAllTags')
  @HttpCode(200)
  async getAllTags(): Promise<Array<Tag>> {
    return await this.tagService.getAllTags()
  }
}
