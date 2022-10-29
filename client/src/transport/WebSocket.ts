import { io, Socket } from "socket.io-client";
import { Subject } from "rxjs";
import SocketPromise from "./SocketPromise";
import type { TResponse, TServerConfig, IWebSocket } from "./domain";

import { ETransportStatus } from "./domain";

class WebSocket implements IWebSocket {
  private socket!: SocketPromise;
  private token!: string;
  private wsUrl!: string;
  public serverConfig!: TServerConfig;

  public status: ETransportStatus = ETransportStatus.DISCONNECTED;
  public subject$ = new Subject<ETransportStatus>();

  create(wsUrl: string) {
    this.wsUrl = wsUrl;
  }

  connect() {
    if (this.socket) {
      this.socket.socket.disconnect();
    }

    const url = new URL(this.wsUrl);
    const ws = io(url.origin, {
      transports: ["websocket", "polling"],
      path: url.pathname,
      auth: {
        token: this.token,
      },
    });
    this.socket = new SocketPromise(ws);
    this.listenStatus(ws);
  }

  emit<T>(event: string, payload: any = ""): Promise<TResponse<T>> {
    if (this.status !== ETransportStatus.CONNECTED) {
      console.log(`[WS] error network status is: ${this.status}`);
    }

    const result = this.socket.emit<T>(event, payload);

    result.catch((data: any) => {
      console.error("[WS emit Error]", data);
    });

    return result;
  }

  on(event: string, clb: (payload: any) => void): void {
    if (this.status !== ETransportStatus.CONNECTED) {
      throw new Error("Transport WS is disconnected");
    }

    this.socket.on(event, clb);
  }

  private listenStatus(ws: Socket): void {
    ws.on("ready", (config: TServerConfig) => {
      this.status = ETransportStatus.CONNECTED;
      this.serverConfig = config;
      this.onChangeStatus();
    });
    ws.on("disconnect", () => {
      this.status = ETransportStatus.DISCONNECTED;
      this.onChangeStatus();
    });
    ws.on("connect_error", () => {
      this.status = ETransportStatus.ERROR;
      this.onChangeStatus();
    });
    ws.on("status", (status: number) => {
      this.status = status;
      this.onChangeStatus();
    });
  }

  disconnect() {
    this.socket.socket.disconnect();
  }

  private onChangeStatus() {
    this.subject$.next(this.status);
  }
}

export default new WebSocket();
