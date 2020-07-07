import { Message } from './../../Model/message.schema';
import { User } from './../../Model/user.schema';
import { Blog } from './../../Model/blog.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class IndexService {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<Blog>,
    @InjectModel(User.name) private readonly userModle: Model<User>,
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
  ) {}

  async getSiteStatics(): Promise<any> {
    const blogs = await this.blogModel.find({});
    const users = await this.userModle.find({});
    const messages = await this.messageModel.find({});
    return {
      blogCount: blogs.length,
      messageCount: messages.length,
      user: {
        recentUser: users.filter(user => users.indexOf(user) < 9),
        userCount: users.length,
      },
    };
  }
}
