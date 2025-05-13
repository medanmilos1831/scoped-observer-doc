import { GLOBAL_EVENT_ENTITY } from './constants';
import { runInterceptor } from './interceptor';

export class EventEntity extends EventTarget {
  entityName?: string;
  eventInterceptor: any = new Map();
  scopedEvents: Map<string, EventEntity> = new Map();
  listeners = new Map();

  constructor(name?: string) {
    super();
    this.entityName = name || GLOBAL_EVENT_ENTITY;
  }

  dispatch = ({
    eventName,
    payload = undefined,
  }: {
    eventName: string;
    payload?: any;
  }) => {
    const event = new CustomEvent(eventName, {
      detail: {
        payload,
      },
    });

    this.dispatchEvent(event);
  };
  subscribe = (eventName: string, callback: any) => {
    let handler = (e: any) => {
      callback(
        this.eventInterceptor.has(eventName)
          ? runInterceptor.call(this, e.detail, eventName)
          : { payload: e.detail.payload }
      );
    };

    this.addEventListener(eventName, handler);
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set());
    }
    this.listeners.get(eventName)!.add(handler);

    return () => {
      this.removeEventListener(eventName, handler);
      this.listeners.get(eventName)!.delete(handler);
      if (this.listeners.get(eventName)!.size === 0) {
        this.listeners.delete(eventName);
      }
    };
  };
}
