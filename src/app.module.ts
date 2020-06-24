import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './Controller/blog/blog.module';
import { UserModule } from './Controller/user/user.module';

@Module({
  imports: [MongooseModule.forRoot(`mongodb://localhost:27017/IRIBlog`), BlogModule, UserModule],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {
}
