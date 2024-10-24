import {
    Controller,
    Post,
    Query,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @UploadedFile() file: globalThis.Express.Multer.File,
        @Query('type') type: string,
        @Query('id') id: number,
    ) {
        const saveStatus = await this.filesService.saveAvatar(file, type, id);

        return saveStatus;
    }
}