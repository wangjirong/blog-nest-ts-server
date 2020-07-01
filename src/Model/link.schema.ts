import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Link extends Document {
  //标题
  @Prop({ required: true })
  title: string;

  //   网址
  @Prop({ required: true })
  href: string;

  //   logo
  @Prop({ required: true })
  logo: string;

  // desc描述
  @Prop({ required: true })
  desc: string;
}
export const LinkSchema = SchemaFactory.createForClass(Link);
