import { IWsAction, TWsMessage } from './ws.types';
import { Subject } from 'rxjs';

class WsService {
  public events: IWsAction[] = [];

  public readonly message$ = new Subject<TWsMessage>();

  add(event: IWsAction) {
    this.events.push(event);
  }

  public sendMessage(userId: number, event, payload: any) {
    this.message$.next({
      userId,
      event,
      payload,
    });
  }
}

export default new WsService();
