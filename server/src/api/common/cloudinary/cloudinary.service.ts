import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

import { ConfigService, ConfigKeys } from '../config/config.service';

@Injectable()
export class CloudinaryService {
  private readonly cloudName;

  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      ['cloud_name']: configService.get(ConfigKeys.CLOUDINARY_CLOUD_NAME),
      ['api_key']: configService.get(ConfigKeys.CLOUDINARY_API_KEY),
      ['api_secret']: configService.get(ConfigKeys.CLOUDINARY_API_SECRET),
    });

    this.cloudName = configService.get(ConfigKeys.CLOUDINARY_CLOUD_NAME);
  }

  async upload(file: Express.Multer.File) {
    const uploadedImage = await cloudinary.uploader.upload(file.path, {
      folder: this.configService.get(ConfigKeys.CLOUDINARY_CLOUD_FOLDER),
    });
    const image = {
      cloudName: this.cloudName,
      publicId: uploadedImage.public_id,
      version: uploadedImage.version,
      format: uploadedImage.format,
    };

    return image;
  }

  destroy(publicId: string) {
    cloudinary.uploader.destroy(publicId);
  }
}
