import { GLOBAL_EVENT_ENTITY } from './constants';
import { EventManager } from './EventManager';
import { actionType } from './types';

/**
 * Dispatches an event to the correct scoped event node within the event tree.
 *
 * This method:
 * - Parses the `scope` string and traverses the `scopedEvents` tree.
 * - Validates the existence of each scope level.
 * - If the target scope and event listener exist, dispatches the event with the provided payload.
 * - Logs the dispatch action (even if payload is missing).
 *
 * Example scope format: `"app:modal:auth"` (nested scopes separated by `:`)
 *
 * @param {Object} params - Parameters for the action.
 * @param {string} [params.scope=GLOBAL_EVENT_ENTITY] - Optional scope in colon-delimited format.
 *        If omitted, defaults to the global event scope.
 * @param {string} params.eventName - Name of the event to dispatch.
 * @param {*} [params.payload] - Optional payload to pass with the event.
 */
export function action(
  this: EventManager,
  { scope = GLOBAL_EVENT_ENTITY, eventName, payload }: actionType
) {
  // Start from the root of the event system
  let current = this.events;

  // Parse the scope path and remove the global marker if present
  const path = scope.split(':');
  if (path[0] === GLOBAL_EVENT_ENTITY) path.shift();

  // Traverse each part of the scope path
  for (const item of path) {
    if (!current.scopedEvents.has(item)) {
      console.warn(`Scope "${scope}" does not exist.`);
      return;
    }
    current = current.scopedEvents.get(item)!;
  }

  // If the event has no listeners in this scope, skip dispatching
  if (!current.listeners.has(eventName)) return;

  // Dispatch the event with the given payload
  current.dispatch({
    eventName,
    payload,
  });

  // Log the dispatch for debugging purposes
  this.log('dispatch', {
    Scope: scope,
    Event: eventName,
    Payload: payload ?? 'No Payload',
  });
}
