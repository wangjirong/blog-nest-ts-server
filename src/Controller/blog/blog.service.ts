import { BlogDto } from './../../Dto/blog.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from '../../Model/blog.schema';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private readonly blogModel: Model<Blog>) {
  }

  async findAll(): Promise<Blog[]> {
    console.log(await this.blogModel.find());
    return this.blogModel.find().exec();
  }

  async addBlog(blog:BlogDto):Promise<Blog>{
    return await new this.blogModel(blog).save();

  }

}
