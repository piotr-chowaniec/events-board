import { extname } from 'path';

import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { HttpException, HttpStatus } from '@nestjs/common';
import { diskStorage } from 'multer';
import { Request } from 'express';
import { v4 as uuid } from 'uuid';

function generateFileName(originalname: string) {
  const fileExtension = extname(originalname);
  return `${uuid()}${fileExtension}`;
}

export const multerOptions: MulterOptions = {
  limits: {
    fileSize: 10485760, // 10MB
  },
  fileFilter(
    req: Request,
    file: Express.Multer.File,
    done: (error: Error, acceptFile: boolean) => void,
  ) {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      done(null, true);
    } else {
      done(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
  storage: diskStorage({
    filename(
      req: Request,
      file: Express.Multer.File,
      done: (error: Error | null, filename: string) => void,
    ) {
      done(null, generateFileName(file.originalname));
    },
  }),
};
