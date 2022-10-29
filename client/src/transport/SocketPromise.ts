import type { Socket } from 'socket.io-client';
import type { TResponse } from './domain';

export default class SocketPromise {
  socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
  }

  emit<T>(event: string, payload: any): Promise<TResponse<T>> {
    return new Promise((resolve: Function, reject: Function) => {
      this.socket.emit(event, payload, (response: TResponse<T>) => {
        if (+response?.status >= 400) {
          reject(response);
        } else {
          resolve(response);
        }
      });
    });
  }

  on(event: string, clb: (payload: any) => void): void {
    this.socket.on(event, clb);
  }
}
