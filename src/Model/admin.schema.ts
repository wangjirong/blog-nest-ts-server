import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Admin extends Document {
  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    default: 'https://iri-blog.oss-cn-beijing.aliyuncs.com/admin/avatar.jpg',
  })
  avatar: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ default: new Date() })
  date: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
