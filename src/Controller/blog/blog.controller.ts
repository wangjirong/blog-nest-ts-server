import { Request, query } from 'express';
import {
  Controller,
  Get,
  Post,
  Req,
  UseInterceptors,
  HttpCode,
  Param,
  Query,
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

  @Get('/detaile/:id')
  @HttpCode(200)
  async getBlogByID(@Param('id') id): Promise<Blog> {
    return await this.blogService.GetBlogByID(id);
  }

  @Get('/getAllBlogs')
  @HttpCode(200)
  async getAllBlog(): Promise<Blog[]> {
    return await this.blogService.findAll();
  }

  @Get('/getBlogs')
  @HttpCode(200)
  async getBlog(@Query() query): Promise<Array<Blog>> {
    return await this.blogService.getBlogsByPageIndexAndPageSize(query);
  }

  @Post('/addBlog')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  async creatdBlog(@Req() req: Request, @UploadedFile() file): Promise<any> {
    const { info } = req.body;
    const result = await this.oSSService.upload(file);
    const blog = await this.blogService.addBlog({
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

  @Get('/getSwipper')
  @HttpCode(200)
  async getSwipper(): Promise<Array<Blog>> {
    return await this.blogService.getSwipper();
  }

  @Get('/addReadCount')
  @HttpCode(200)
  async addReadCount(@Query() _id): Promise<any> {
    return await this.blogService.addReadCount(_id);
  }

  @Get('/getAllTags')
  @HttpCode(200)
  async getAllTags(): Promise<Array<string>> {
    return;
  }

  @Get('/searchBlog')
  @HttpCode(200)
  async searchBlog(@Query() query): Promise<Array<Blog>> {
    const { keyword } = query;
    return await this.blogService.searchByKeyword(keyword);
  }


  @Post('/comment')
  @HttpCode(200)
  async comment(@Req() req:Request):Promise<any>{
    const {_id,text,user} = req.body;
    console.log(_id,text,user);
    return await this.blogService.comment(_id,text,user)
  }
}
