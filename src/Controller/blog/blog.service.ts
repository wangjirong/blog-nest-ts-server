import { BlogDto } from './../../Dto/blog.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from '../../Model/blog.schema';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<Blog>,
  ) {}

  async GetBlogByID(id: string): Promise<Blog> {
    return await this.blogModel.findById(id);
  }

  async findAll(): Promise<Blog[]> {
    return await this.blogModel.find().sort({date:-1});
  }

  async addBlog(blog: BlogDto): Promise<Blog> {
    return await new this.blogModel(blog).save();
  }

  async deleteBlog(_id: string): Promise<any> {
    return await this.blogModel.findByIdAndDelete(_id);
  }

  async getBlogsByPageIndexAndPageSize({
    pageSize,
    pageIndex,
  }): Promise<Array<Blog>> {
    pageSize = parseInt(pageSize);
    pageIndex = parseInt(pageIndex);
    return await this.blogModel
      .find()
      .skip((pageIndex - 1) * pageSize)
      .limit(pageSize)
      .sort({ date: -1 });
  }

  async getSwipper(count: number): Promise<Array<Blog>> {
    return await this.blogModel
      .find({ stick: true })
      .sort({ date: -1 })
      .limit(count || 3);
  }

  async addReadCount(_id: string): Promise<any> {
    return await this.blogModel.findByIdAndUpdate(_id, {
      $inc: {
        readCount: +1,
      },
    });
  }

  async comment(_id: string, text: string, user: object): Promise<any> {
    return this.blogModel.update(
      { _id },
      {
        $push: {
          comment: {
            text,
            user,
            date: new Date(),
            reply: [],
          },
        },
      },
    );
  }

  async searchByKeyword(keyword: string): Promise<Array<Blog>> {
    const regx = new RegExp(keyword, 'i');
    return await this.blogModel
      .find({
        $or: [
          {
            title: {
              $regex: regx,
            },
          },
          {
            desc: {
              $regex: regx,
            },
          },
          {
            tags: {
              $regex: regx,
            },
          },
        ],
      })
      .sort({ date: -1 });
  }
}
