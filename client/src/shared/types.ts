export type LoginFormValues = {
  email: string;
  password: string;
};

export enum EVENT_STATUS {
  'DRAFT' = 'DRAFT',
  'PUBLISHED' = 'PUBLISHED',
  'CANCELED' = 'CANCELED',
}

export type EventFiltersType = {
  status?: keyof typeof EVENT_STATUS;
  userId?: string;
};
