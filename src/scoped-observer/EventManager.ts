import { subscribe } from '.';
import { EventEntity } from './EventEntity';

export class EventManager {
  events = new EventEntity();
  logger: boolean = false;
  private log(type: 'dispatch' | 'subscribe', data: Record<string, any>) {
    if (this.logger) {
      console.group(`[EventManager] ${type.toUpperCase()}`);
      console.table(data);
      console.groupEnd();
    }
  }
  managerAction = ({
    scope,
    eventName,
    payload,
  }: {
    scope?: string;
    eventName: string;
    payload?: any;
  }) => {
    if (scope === 'global' || !scope) {
      this.log('dispatch', {
        Scope: 'GLOBAL',
        Event: eventName,
        Payload: payload ?? 'No Payload',
      });

      this.events.dispatch({ eventName, payload: payload || undefined });
      return;
    }
    let current = this.events;
    for (const item of scope.split(':')) {
      if (!current.scopedEvents[item]) {
        console.warn(`Scope "${scope}" does not exist.`);
        return;
      }
      current = current.scopedEvents[item];
    }

    this.log('dispatch', {
      Scope: scope,
      Event: eventName,
      Payload: payload ?? 'No Payload',
    });
    current.dispatch({
      eventName,
      payload: payload || undefined,
    });
  };

  managerSubscribe = ({
    scope,
    eventName,
    callback,
  }: {
    scope?: string;
    eventName: string;
    callback: (data: { payload: any }) => void;
  }) => {
    if (scope === 'global' || !scope) {
      return this.events.subscribe(eventName, callback);
    }
    let arr = scope.split(':');
    let currentLevel = this.events;
    let unsubscriber: (() => void) | undefined = undefined;

    arr.forEach((item, index) => {
      if (!currentLevel.scopedEvents[item]) {
        currentLevel.scopedEvents[item] = new EventEntity(item);
      }

      if (index === arr.length - 1) {
        unsubscriber = currentLevel.scopedEvents[item].subscribe(
          eventName,
          callback
        );
      }

      currentLevel = currentLevel.scopedEvents[item];
    });
    return unsubscriber!;
  };

  managerEventInterceptor = ({
    scope,
    eventName,
    callback,
  }: {
    scope?: string;
    eventName: string;
    callback: (data: { eventPayload: any }) => any;
  }) => {
    if (scope === 'global' || !scope) {
      this.events.eventInterceptor.interceptor(callback, { eventName });
      return;
    }

    let current = this.events;
    for (const item of scope.split(':')) {
      if (!current.scopedEvents[item]) {
        console.warn(`Scope "${scope}" does not exist.`);
        return;
      }
      current = current.scopedEvents[item];
    }

    current.eventInterceptor.interceptor(callback, { eventName });
  };

  configEventManager = (config: { logger: boolean }) => {
    this.logger = config.logger;
  };

  autoBindListeners(
    object: any,
    objMap: { [key: string]: { eventName: string }[] }
  ) {
    Object.entries(objMap).map(([k, v]: [string, any]) => {
      v.forEach((item: any) => {
        subscribe({
          ...item,
          scope: Object.getPrototypeOf(object).constructor.name,
          callback(data: any) {
            object[k](data.payload);
          },
        });
      });
    });
  }

  logging = () => {
    console.log(this.events);
  };
}
