import { Injectable } from '@nestjs/common';
import { Image } from '@common-packages/data-access-layer';

import { PrismaService } from '../common/prisma/prisma.service';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';

type ImageFilterParams = { userId?: string; eventId?: string };

const getFilter = ({ userId, eventId }: ImageFilterParams) => ({
  ...(userId ? { userId } : {}),
  ...(eventId ? { eventId } : {}),
});

@Injectable()
export class ImagesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  findOne(params: ImageFilterParams): Promise<Image | undefined> {
    return this.prismaService.image.findUnique({
      where: getFilter(params),
    });
  }

  async create(
    file: Express.Multer.File,
    params: ImageFilterParams,
  ): Promise<Image> {
    const image = await this.cloudinaryService.upload(file);

    return this.prismaService.image.create({
      data: {
        ...image,
        ...getFilter(params),
      },
    });
  }

  async remove(params: ImageFilterParams): Promise<void> {
    const imageToRemove = await this.prismaService.image.findUnique({
      where: getFilter(params),
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
