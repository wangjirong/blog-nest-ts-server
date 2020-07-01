import { DiaryDto } from './../../Dto/diary.dto';
import { Diary } from './../../Model/diary.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DiaryService {
  constructor(
    @InjectModel(Diary.name) private readonly diaryModel: Model<Diary>,
  ) {}

  async addDiary(diaryDto: DiaryDto): Promise<Diary> {
    return new this.diaryModel(diaryDto).save();
  }

  async deleteDiary(_id: string): Promise<any> {
    return this.diaryModel.findByIdAndDelete(_id);
  }

  async getAllDiary(): Promise<Array<Diary>> {
    return await this.diaryModel.find();
  }
}
