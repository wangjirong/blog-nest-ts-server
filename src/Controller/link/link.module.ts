import { Link } from './../../Model/link.schema';
import { LinkService } from './link.service';
import { LinkController } from './link.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { LinkSchema } from 'src/Model/link.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Link.name, schema: LinkSchema }])],
  controllers: [LinkController],
  providers: [LinkService],
})
export class LinkModule {

}
