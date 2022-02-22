export type LoginFormValues = {
  email: string;
  password: string;
};

export enum EVENT_STATUS {
  'DRAFT' = 'DRAFT',
  'PUBLISHED' = 'PUBLISHED',
  'CANCELED' = 'CANCELED',
}

type PaginationFilterType = {
  skip?: string;
  take?: string;
};

export type EventFiltersType = {
  status?: keyof typeof EVENT_STATUS;
  userId?: string;
  participant?: string;
} & PaginationFilterType;

export type ParticipantFiltersType = {
  eventId?: string;
} & PaginationFilterType;

export type UserFiltersType = PaginationFilterType;

export type ImageType = {
  cloudName: string;
  publicId: string;
  version: number;
  format: string;
};

type ModalDataItem = boolean | string | number | Date;

export type ModalDataType =
  | {
      [key: string]:
        | ModalDataItem
        | {
            [key: string]:
              | ModalDataItem
              | {
                  [key: string]: ModalDataItem;
                };
          };
    }
  | null
  | undefined;
