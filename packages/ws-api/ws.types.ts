import { ArgumentMetadata } from '@nestjs/common';

export type IWsAction = {
  targetClass: object;
  actionName: string;
  moduleName: string;
  handler: (payload: any) => Promise<any>;
  context?: any;
  metadata?: ArgumentMetadata;
};

export type TWsMessage = {
  userId: number;
  event: string;
  payload: any;
};

export type TWsResponse = {
  payload: any;
};

export const WS_OPTIONS = 'WS_OPTIONS';
