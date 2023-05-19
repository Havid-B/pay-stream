import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Post('/videos')
  @UseInterceptors(FileInterceptor('video', { dest: './upload' }))
  uploadVideo(@UploadedFile() video: Express.Multer.File) {
    return this.appService.uploadToSpheron(video);
  }

  @Post('/metadatas')
  @UseInterceptors(FileInterceptor('metadata', { dest: './upload' }))
  uploadMetadata(@UploadedFile() metadata: Express.Multer.File) {
    return this.appService.uploadToSpheron(metadata);
  }
}
