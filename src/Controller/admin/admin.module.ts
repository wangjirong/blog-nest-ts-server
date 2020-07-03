import { AdminService } from './admin.service';
import { config } from './../../config/ali-oss.config';
import { Admin, AdminSchema } from './../../Model/admin.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { OSSModule } from '@nest-public/nest-oss';
import { AdminController } from './admin.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    OSSModule.forRoot(config),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
