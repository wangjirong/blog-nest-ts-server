import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  openID: string;
  @Prop({ required: true })
  nickName: string;
  @Prop({ required: true })
  avatar: string;
  // 登录时间
  @Prop({ default: new Date() })
  date: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
