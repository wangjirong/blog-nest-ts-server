import { MailService } from './../mail/mail.service';
import { jwtSecret } from './../../config/admin';
import { AdminService } from './admin.service';
import { config } from './../../config/ali-oss.config';
import { Admin, AdminSchema } from './../../Model/admin.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { OSSModule } from '@nest-public/nest-oss';
import { AdminController } from './admin.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    OSSModule.forRoot(config),
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: {
        expiresIn: '3600s',
      },
    }),
  ],
  controllers: [AdminController],
  providers: [AdminService,MailService],
})
export class AdminModule {}
