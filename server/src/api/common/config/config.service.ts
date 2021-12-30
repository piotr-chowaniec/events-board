import { Injectable } from '@nestjs/common';

export enum ConfigKeys {
  APPLICATION_NAME = 'APPLICATION_NAME',
  PORT = 'PORT',
  DATABASE_URL = 'DATABASE_URL',
  IS_PRODUCTION_ENV = 'IS_PRODUCTION_ENV',
  PUBLIC_KEY = 'PUBLIC_KEY',
  ACCESS_TOKEN_KEY = 'ACCESS_TOKEN_KEY',
  AUTHORIZATION_KEY = 'AUTHORIZATION_KEY',
  REFRESH_TOKEN_KEY = 'REFRESH_TOKEN_KEY',
  JWT_SECRET_KEY = 'JWT_SECRET_KEY',
  JWT_EXPIRE_IN = 'JWT_EXPIRE_IN',
}

type Config = {
  [key in ConfigKeys]: string;
};

export const config = {
  [ConfigKeys.APPLICATION_NAME]: 'events-board',
  [ConfigKeys.PORT]: process.env.PORT || '7000',
  [ConfigKeys.DATABASE_URL]: process.env.DATABASE_URL,
  [ConfigKeys.IS_PRODUCTION_ENV]:
    process.env.NODE_ENV === 'production' ? 'true' : 'false',
  [ConfigKeys.PUBLIC_KEY]: process.env.PUBLIC_KEY || 'isPublic',
  [ConfigKeys.ACCESS_TOKEN_KEY]: process.env.ACCESS_TOKEN_KEY || 'access_token',
  [ConfigKeys.AUTHORIZATION_KEY]:
    process.env.AUTHORIZATION_KEY || 'authorization',
  [ConfigKeys.REFRESH_TOKEN_KEY]:
    process.env.REFRESH_TOKEN_KEY || 'refresh_token',
  [ConfigKeys.JWT_SECRET_KEY]: process.env.JWT_SECRET_KEY || 'NotSoSecretKey',
  [ConfigKeys.JWT_EXPIRE_IN]: process.env.JWT_EXPIRE_IN || '2h',
};

@Injectable()
export class ConfigService {
  private readonly config: Config = config;

  get(key: ConfigKeys) {
    return this.config[key];
  }
}
