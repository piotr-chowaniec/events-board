import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';

import { ConfigService } from '../../config/config.service';
import { configServiceMock } from '../../config/__mocks__/config.service.mock';
import { CloudinaryService } from '../cloudinary.service';

jest.mock('cloudinary', () => ({
  v2: {
    config: jest.fn().mockReturnValue(null),
    uploader: {
      upload: jest.fn().mockResolvedValue({
        ['public_id']: uuid(),
        version: uuid(),
        format: '.extension',
      }),
      destroy: jest.fn(),
    },
  },
}));

const mockFile = {
  filename: 'fileName',
  fieldname: 'fieldName',
  originalname: 'originalFileName',
  encoding: 'encoding',
  mimetype: 'mimetype',
  size: 123123,
  stream: null,
  destination: 'destination',
  path: 'path',
  buffer: null,
};

describe('CloudinaryService', () => {
  let service: CloudinaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CloudinaryService,
        { provide: ConfigService, useValue: configServiceMock },
      ],
    }).compile();

    service = module.get<CloudinaryService>(CloudinaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return created cloudinary image', async () => {
    // when
    const uploadedImage = await service.upload(mockFile);

    // then
    expect(uploadedImage).toHaveProperty('cloudName', 'cloudinary-cloud-name');
    expect(uploadedImage).toHaveProperty('publicId');
    expect(uploadedImage).toHaveProperty('version');
    expect(uploadedImage).toHaveProperty('format', '.extension');
  });

  it('should remove cloudinary image', async () => {
    // when
    await service.destroy('some-image');
  });
});
