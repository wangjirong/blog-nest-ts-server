import { OSSService } from '@nest-public/nest-oss';
import { FileInterceptor } from '@nestjs/platform-express';
import { DiaryService } from './diary.service';
import {
  Controller,
  Get,
  Post,
  HttpCode,
  UseInterceptors,
  Req,
  UploadedFile,
  Query,
  Param,
} from '@nestjs/common';
import { Diary } from 'src/Model/diary.schema';
import { Request } from 'express';

@Controller('diary')
export class DiaryController {
  constructor(
    private readonly diaryService: DiaryService,
    private readonly oSSService: OSSService,
  ) {}

  @Post('/addDiary')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  async addDiary(@Req() req: Request, @UploadedFile() file): Promise<Diary> {
    const { text } = req.body;
    console.log(text);

    const result = await this.oSSService.upload(file);
    console.log(result[0]);

    const res = await this.diaryService.addDiary({
      text,
      img: result[0],
      date: new Date(),
    });

    return;
  }

  @Post('/deleteDiary/:id')
  @HttpCode(200)
  async deleteDiary(@Param('id') id, @Req() req: Request): Promise<any> {
    const { img } = req.body;
    const uploadUrl = [img.path];
    return Promise.all([
      this.diaryService.deleteDiary(id),
      this.oSSService.deleteMulti(uploadUrl),
    ]);
  }

  @Get('/getAllDiary')
  @HttpCode(200)
  async getAllDiary(): Promise<Array<Diary>> {
    return await this.diaryService.getAllDiary();
  }
}
