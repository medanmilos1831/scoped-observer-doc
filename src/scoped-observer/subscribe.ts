import { GLOBAL_EVENT_ENTITY } from './constants';
import { EventEntity } from './EventEntity';
import { EventManager } from './EventManager';
import { subscribeType } from './types';

/**
 * Subscribes to an event within a specified scope.
 *
 * If no scope is provided or it equals `GLOBAL_EVENT_ENTITY`, the subscription is made
 * on the global event entity. Otherwise, the scope is split by `:` to represent a
 * hierarchy, and nested scoped entities are created if they don't exist.
 *
 * Returns an unsubscribe function to remove the registered callback.
 *
 * @this {EventManager} The EventManager instance managing all global and scoped events.
 * @param {subscribeType} options - Parameters for subscribing to an event.
 * @param {string} [options.scope] - Optional scoped namespace, formatted as "parent:child:subchild".
 * @param {string} options.eventName - Name of the event to subscribe to.
 * @param {(data: { payload: any }) => void} options.callback - Callback function triggered when the event is emitted.
 *
 * @returns {() => void} A function to unsubscribe from the event.
 *
 * @example
 * // Subscribe to a global event
 * subscribe.call(eventManager, {
 *   eventName: 'user:login',
 *   callback: ({ payload }) => console.log('Logged in:', payload),
 * });
 *
 * @example
 * // Subscribe to a scoped event
 * subscribe.call(eventManager, {
 *   scope: 'admin:dashboard',
 *   eventName: 'refresh',
 *   callback: ({ payload }) => console.log('Refreshing dashboard:', payload),
 * });
 */
export function subscribe(
  this: EventManager,
  { scope = GLOBAL_EVENT_ENTITY, eventName, callback }: subscribeType
) {
  let unsubscribe: () => void = () => {};
  let target =
    scope === GLOBAL_EVENT_ENTITY ? this.events : this.scopesIterator(scope);
  unsubscribe = target.subscribe(eventName, callback);
  return unsubscribe;
}
