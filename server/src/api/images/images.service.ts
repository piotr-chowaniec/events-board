import { Injectable } from '@nestjs/common';
import { Image } from '@common-packages/data-access-layer';

import { PrismaService } from '../common/prisma/prisma.service';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';

import { getFilters, ImageFiltersParams } from './helpers';

@Injectable()
export class ImagesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  findOne(params: ImageFiltersParams): Promise<Image | undefined> {
    return this.prismaService.image.findUnique({
      where: getFilters(params),
    });
  }

  async create(
    file: Express.Multer.File,
    params: ImageFiltersParams,
  ): Promise<Image> {
    const image = await this.cloudinaryService.upload(file);

    return this.prismaService.image.create({
      data: {
        ...image,
        ...getFilters(params),
      },
    });
  }

  async remove(params: ImageFiltersParams): Promise<void> {
    const imageToRemove = await this.prismaService.image.findUnique({
      where: getFilters(params),
    });

    if (imageToRemove) {
      await this.cloudinaryService.destroy(imageToRemove.publicId);
      await this.prismaService.image.delete({
        where: {
          publicId: imageToRemove.publicId,
        },
      });
    }
  }
}
