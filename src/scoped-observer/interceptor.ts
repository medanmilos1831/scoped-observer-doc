import { GLOBAL_EVENT_ENTITY } from './constants';
import { EventEntity } from './EventEntity';
import { EventManager } from './EventManager';
import { interceptorType } from './types';

/**
 * Registers an interceptor callback for a specific event within the given scope.
 *
 * Interceptors are functions that modify or inspect the payload before it is
 * delivered to event subscribers. They execute in the order they are registered.
 *
 * If the provided scope does not exist, it will be created automatically.
 *
 * @this {EventManager} The event manager instance that manages global and scoped events.
 * @param {interceptorType} options - The configuration for registering the interceptor.
 * @param {string} [options.scope=GLOBAL_EVENT_ENTITY] - Optional scope namespace (e.g. "app:module:submodule").
 * @param {string} options.eventName - The name of the event to intercept.
 * @param {(payload: any) => any} options.callback - The interceptor function to apply to the payload.
 *
 * @example
 * interceptor.call(eventManager, {
 *   eventName: 'user:update',
 *   scope: 'admin:profile',
 *   callback: (payload) => ({ ...payload, modified: true }),
 * });
 */
export function interceptor(
  this: EventManager,
  { scope = GLOBAL_EVENT_ENTITY, eventName, callback }: interceptorType
) {
  // Determine the target entity (global or scoped) where the interceptor will be registered
  const target =
    scope === GLOBAL_EVENT_ENTITY ? this.events : this.scopesIterator(scope);

  // Ensure the interceptor list exists for the given event
  if (!target.eventInterceptor.has(eventName)) {
    target.eventInterceptor.set(eventName, []);
  }

  // Register the interceptor callback
  target.eventInterceptor.get(eventName)!.push(callback);
}

/**
 * Executes all registered interceptors for a given event and modifies the payload.
 *
 * Each registered interceptor for the event is executed in order of registration.
 * The payload is passed through each callback and potentially transformed.
 *
 * @this {EventEntity} The event entity instance for a specific scope.
 * @param {{ payload: any }} eventDetail - The original event detail object with the payload.
 * @param {string} eventName - The name of the event whose interceptors should be executed.
 * @returns {{ payload: any }} The final event detail object after passing through interceptors.
 *
 * @example
 * const updatedPayload = runInterceptor.call(eventEntity, { payload: data }, 'user:update');
 * console.log(updatedPayload); // Payload after all interceptor modifications
 */
export function runInterceptor(
  this: EventEntity,
  eventDetail: any,
  eventName: interceptorType['eventName']
) {
  let payload = eventDetail.payload;

  // If interceptors exist for the event, run them in order
  if (this.eventInterceptor.has(eventName)) {
    this.eventInterceptor
      .get(eventName)!
      .forEach((callback: interceptorType['callback']) => {
        // Update the payload with each interceptor’s return value
        payload = callback(payload);
      });
  }

  // Return the final payload after interception
  return { payload };
}
