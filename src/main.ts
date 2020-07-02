import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log("数据库已连接");
  
  app.enableCors()
  const options = new DocumentBuilder()
    .setTitle('艾瑞个人博客接口API')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('Blog')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(9000);
}
bootstrap();
