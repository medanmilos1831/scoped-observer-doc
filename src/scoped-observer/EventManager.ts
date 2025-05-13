import { action } from './action';
import { GLOBAL_EVENT_ENTITY } from './constants';
import { EventEntity } from './EventEntity';
import { interceptor } from './interceptor';
import { subscribe } from './subscribe';
import { actionType, interceptorType, subscribeType } from './types';

export class EventManager {
  events = new EventEntity();
  logger: boolean = false;
  protected log(type: 'dispatch' | 'subscribe', data: Record<string, any>) {
    if (this.logger) {
      console.group(`[EventManager] ${type.toUpperCase()}`);
      console.table(data);
      console.groupEnd();
    }
  }

  protected scopesIterator = (scope: string) => {
    let scopes = scope.split(':').filter(Boolean) ?? [];
    let currentLevel = this.events;
    scopes.forEach((item) => {
      if (!currentLevel.scopedEvents.has(item)) {
        currentLevel.scopedEvents.set(item, new EventEntity(item));
      }
      currentLevel = currentLevel.scopedEvents.get(item)!;
    });
    return currentLevel;
  };

  managerAction = (obj: actionType) => {
    action.call(this, obj);
  };

  managerSubscribe = ({
    scope = GLOBAL_EVENT_ENTITY,
    eventName,
    callback,
  }: subscribeType) => {
    return subscribe.call(this, { scope, eventName, callback });
  };

  managerEventInterceptor = ({
    scope = GLOBAL_EVENT_ENTITY,
    eventName,
    callback,
  }: interceptorType) => {
    interceptor.call(this, {
      scope,
      eventName,
      callback,
    });
  };

  configEventManager = (config: { logger: boolean }) => {
    this.logger = config.logger;
  };

  logging = () => {
    console.log(this);
  };
}
