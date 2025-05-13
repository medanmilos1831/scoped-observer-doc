import { GLOBAL_EVENT_ENTITY } from './constants';
import { EventInterceptor } from './eventInterceptor';

/**
 * Type for the function used to subscribe to an event. The callback function receives event data.
 * This function is used as a callback when subscribing to an event, allowing the user to receive data sent with the event.
 *
 * @param data The data sent with the event.
 * @param data.payload The main data sent along with the event.
 */
type subscriberCallbackType = (data: { payload: any }) => void;

/**
 * The `EventEntity` class represents an event that can be dispatched and subscribed to.
 * It encapsulates the logic for handling events, including the dispatching of events, subscribing to them,
 * and processing payload data through interceptors and scopes before an event is dispatched.
 */
export class EventEntity extends EventTarget {
  /**
   * Instance of the interceptor service that manages the processing of event payloads before dispatch.
   * This service executes registered interceptors to modify or process the event's payload.
   *
   * @example
   * eventEntity.eventInterceptor.executeInterceptors("userLogin", payload);
   */
  eventInterceptor!: EventInterceptor;

  /**
   * Instance of the scoped event service, responsible for managing the scope of events.
   * This service manages event subscriptions and ensures that events are correctly scoped for specific contexts.
   */
  entityName?: string;
  scopedEvents: { [key: string]: EventEntity } = {};

  /**
   * Constructor for creating an instance of `EventEntity`.
   * It initializes the event entity with the provided interceptor and scoped event services.
   *
   * @param eventInterceptor The service responsible for processing event data via interceptors.
   */
  constructor(name?: string) {
    super(); // Calls the constructor of the `EventTarget` class, which provides event handling functionality.
    this.entityName = name || GLOBAL_EVENT_ENTITY;
    this.eventInterceptor = new EventInterceptor();
  }

  /**
   * Dispatches an event with the processed payload.
   * Before the event is dispatched, the associated interceptors are executed to modify or validate the event's data.
   *
   * @param eventName The name of the event to be dispatched.
   * @param payload The data to be sent with the event. Defaults to `undefined` if no payload is provided.
   * @example
   * eventEntity.dispatch({ eventName: "userLogin", payload: { user: "John" } });
   */
  dispatch = ({
    eventName,
    payload = undefined,
  }: {
    eventName: string; // The name of the event.
    payload?: any; // The payload to be sent with the event.
  }) => {
    // Execute interceptors to process the payload before dispatching the event.
    let { payload: eventPayload } = this.eventInterceptor.executeInterceptors(
      eventName,
      payload
    );

    // Creating a new custom event with the processed data (payload).
    const event = new CustomEvent(eventName, {
      detail: {
        payload: eventPayload, // The processed payload is included in the event's detail property.
      },
    });

    // Dispatching the event, making it available for listeners.

    this.dispatchEvent(event);
    if (this.scopedEvents['*']) {
      this.dispatchEvent(new CustomEvent('*', event));
    }
  };

  /**
   * Allows a function to subscribe to an event.
   * When the specified event is emitted, the callback function will be invoked with the event data.
   * The returned unsubscribe function can be used to remove the listener when no longer needed.
   *
   * @param eventName The name of the event to subscribe to.
   * @param callback The callback function that is triggered when the event is emitted.
   * @returns A function that can be called to unsubscribe from the event.
   * @example
   * const unsubscribe = eventEntity.subscribe("userLogin", (data) => { console.log(data.payload); });
   * unsubscribe(); // Unsubscribe from the event.
   */
  subscribe = (eventName: string, callback: subscriberCallbackType) => {
    if (eventName === '*') {
      if (!this.scopedEvents[eventName]) {
        this.scopedEvents[eventName] = new EventEntity(eventName);
      }
    }

    // Define the handler function that calls the provided callback with event data.
    let handler = (e: any) => {
      callback(e.detail); // The event data is contained in `e.detail`.
    };

    // Add an event listener to the event entity for the specified event.
    this.addEventListener(eventName, handler);

    // Return a function that removes the event listener when called.
    return () => this.removeEventListener(eventName, handler);
  };
}
