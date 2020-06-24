import { config } from './../../config/ali-oss.config';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { Blog, BlogSchema } from '../../Model/blog.schema';

import { OSSModule } from '@nest-public/nest-oss';

@Module({
  imports: [MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),OSSModule.forRoot(config)],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {

}
