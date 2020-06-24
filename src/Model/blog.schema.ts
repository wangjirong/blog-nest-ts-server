import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Blog extends Document {
  //文章标题
  @Prop({ required: true })
  title: string;


  //文章简介概述
//   @Prop({ required: true })
//   state: string;
//   //文章封面
//   @Prop({ required: true })
//   cover_img: string;
// //  文章发布日期
//   @Prop({ default: new Date() })
//   date: Date;
// //  作者
//   @Prop({ default: '艾瑞' })
//   author: string;
// //  类型-是否原创
//   @Prop({ required: true })
//   type: string;
// //  文章地址url
//   @Prop({ required: true })
//   md_url: string;
// //分类
//   @Prop([String])
//   classifications: string[];
// //  评论，留言

}
export const BlogSchema = SchemaFactory.createForClass(Blog);
