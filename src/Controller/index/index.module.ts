import { User, UserSchema } from './../../Model/user.schema';
import { Message, MessageSchema } from './../../Model/message.schema';
import { Blog, BlogSchema } from './../../Model/blog.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { IndexService } from './index.service';
import { Module } from '@nestjs/common';
import { IndexController } from './index.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Blog.name, schema: BlogSchema },
      { name: Message.name, schema: MessageSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [IndexController],
  providers: [IndexService],
})
export class IndexModule {}
