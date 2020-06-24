import { Controller, Get, Post } from '@nestjs/common';
import { BlogService } from './blog.service';
import { Blog } from '../../Model/blog.schema';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {
  }

  @Get()
  index(): string {
    return 'blog index';
  }

  @Get('/getBlogs')
  async getBlog(): Promise<Blog[]> {
    console.log(await this.blogService.findAll());
    return await this.blogService.findAll();
  }

  @Post('/addBlog')
  creatdBlog(): string {
    return 'success';
  }


}

