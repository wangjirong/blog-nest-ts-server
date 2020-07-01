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
    MongooseModule.forRoot(`mongodb://localhost:27017/IRIBlog`),
    BlogModule,
    UserModule,
    TagModule,
    LinkModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
