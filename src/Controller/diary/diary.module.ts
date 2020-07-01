import { Diary } from './../../Model/diary.schema';
import { DiaryService } from './diary.service';
import { DiaryController } from './diary.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { DiarySchema } from 'src/Model/diary.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Diary.name, schema: DiarySchema }]),
  ],
  controllers: [DiaryController],
  providers: [DiaryService],
})
export class DiaryModule {}
