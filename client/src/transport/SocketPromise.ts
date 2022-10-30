import type { Socket } from 'socket.io-client';

export default class SocketPromise {
  socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
  }

  emit<T extends { error?: string }>(event: string, payload: any): Promise<T> {
    return new Promise((resolve: Function, reject: Function) => {
      this.socket.emit(event, payload, (response: T) => {
        if (response?.error) {
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
