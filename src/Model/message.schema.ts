import { User } from './user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Message extends Document {
  // 留言人？
  @Prop({ required: true })
  user: User;

  @Prop({ required: true })
  browser: string;

  @Prop({ default: '北京市朝阳区' })
  location: string;

  @Prop({ default: new Date() })
  date: Date;

  @Prop({ required: true })
  text: string;

  @Prop({ default: [] })
  replys: Array<Object>;
}
export const MessageSchema = SchemaFactory.createForClass(Message);
