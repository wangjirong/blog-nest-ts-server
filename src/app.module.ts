import { AdminModule } from './Controller/admin/admin.module';
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
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { mailSTMPHost, mailSTMPSecret } from './config/mail';

@Module({
  imports: [
    MongooseModule.forRoot(localDataBaseURI),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.qq.com',
        port: 465,
        auth: {
          user: mailSTMPHost,
          pass: mailSTMPSecret,
        },
      },
      defaults: {
        from: mailSTMPHost,
      },
      preview: true,

      // template: {
      //   dir:process.cwd() + '/template/',
      //   adapter: new HandlebarsAdapter(),
      //   options: {
      //     strict: true,
      //   },
      // },
    }),
    BlogModule,
    DiaryModule,
    UserModule,
    TagModule,
    LinkModule,
    MessageModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
