import type { Observable } from 'rxjs';

export type TServerConfig = {
  date: string;
};

export enum ETransportStatus {
  CONNECTED = 200,
  DISCONNECTED = 503,
  ERROR = 502,
  UNAUTHORIZED = 401,
}

export type TWsMessage = {
  event: string;
  payload: any;
};

export interface IWebSocket {
  status: ETransportStatus;
  subject$: Observable<ETransportStatus>;
  create(wsUrl: string): void;
  connect(): void;
  disconnect(): void;
  emit<T>(event: string, payload: any): Promise<T>;
  on(event: string, clb: (payload: any) => void): void;
}
