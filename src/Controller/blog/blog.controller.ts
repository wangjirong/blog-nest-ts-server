import { Request } from 'express';
import {
  Controller,
  Get,
  Post,
  Req,
  UseInterceptors,
  HttpCode,
  Param,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { Blog } from '../../Model/blog.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common';
import { OSSService } from '@nest-public/nest-oss';

@Controller('blog')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    private readonly oSSService: OSSService,
  ) {}

  @Get()
  index(): string {
    return 'blog index';
  }

  @Get('/getAllBlogs')
  async getBlog(): Promise<Blog[]> {
    return await this.blogService.findAll();
  }

  @Post('/addBlog')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  async creatdBlog(@Req() req: Request, @UploadedFile() file): Promise<any> {
    const { info } = req.body;
    const result = await this.oSSService.upload(file);
    const blog = this.blogService.addBlog({
      ...JSON.parse(info),
      cover: result[0],
    });
    return 'success';
  }

  @Post('/deleteBlog/:_id')
  @HttpCode(200)
  async deleteBlog(@Param('_id') _id, @Req() req: Request): Promise<any> {
    const { cover } = req.body;
    const uploadUrl = [cover.path];
    return Promise.all([
      this.blogService.deleteBlog(_id),
      this.oSSService.deleteMulti(uploadUrl),
    ]);
  }
}
