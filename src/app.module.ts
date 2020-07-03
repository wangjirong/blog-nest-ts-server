import { MessageModule } from './Controller/message/message.module';
import localDataBaseURI, { ServerDataBaseURI } from './config/database';
import { DiaryModule } from './Controller/diary/diary.module';
import { LinkModule } from './Controller/link/link.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './Controller/blog/blog.module';
import { UserModule } from './Controller/user/user.module';
import { TagModule } from './Controller/tag/tag.module';


@Module({
  imports: [
    MongooseModule.forRoot(localDataBaseURI),
    BlogModule,
    DiaryModule,
    UserModule,
    TagModule,
    LinkModule,
    MessageModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
