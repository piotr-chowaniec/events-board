import { config, ConfigKeys } from '../config.service';

const mockConfig = {
  ...config,
  [ConfigKeys.CLOUDINARY_CLOUD_NAME]: 'cloudinary-cloud-name',
  [ConfigKeys.CLOUDINARY_CLOUD_FOLDER]: 'cloudinary-folder-name',
  [ConfigKeys.CLOUDINARY_API_KEY]: 'cloudinary-api-key',
  [ConfigKeys.CLOUDINARY_API_SECRET]: 'cloudinary-api-secret',
};

export const configServiceMock = {
  get: (key: ConfigKeys) => mockConfig[key],
};
