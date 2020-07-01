import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Diary extends Document {
  //标题
  @Prop({ required: true })
  text: string;

  //   图片
  @Prop()
  img: Object;

  //   date
  @Prop({ default: new Date() })
  date: Date;
}
export const DiarySchema = SchemaFactory.createForClass(Diary);
