/**
 * Interface that defines the basic parameters for the interceptor configuration.
 * This interface allows you to specify the event name that the interceptor will listen for.
 */
interface IInterceptor {
  /**
   * The name of the event that the interceptor responds to.
   * This is used to associate the interceptor with specific events.
   *
   * @example "userLogin"
   */
  eventName: string;
}

/**
 * Type for a function representing the interceptor callback.
 * Interceptors allow modifying or processing the event payload before it is dispatched.
 *
 * @param obj An object containing the event payload to be processed.
 * @returns The processed payload, or `undefined` if the interceptor does not modify the payload.
 */
type interceptorCallbackType = (obj: { eventPayload: any }) => any;

/**
 * Class that manages the registration, execution, and removal of interceptors for events.
 * Interceptors are functions that can modify or process the event payload before the event is dispatched.
 */
export class EventInterceptor {
  /**
   * Maps event names to a list of interceptors that are executed when the event is triggered.
   * The key is the event name, and the value is an array of interceptors associated with that event.
   */
  interceptors = new Map<string, { interceptor: interceptorCallbackType }[]>();

  /**
   * Registers a new interceptor for a specific event.
   * The interceptor is a callback function that processes the event payload.
   *
   * @param callback The interceptor function that processes the payload of the event.
   * @param config Configuration containing the event name to which the interceptor responds.
   * @returns A function that allows the removal of this interceptor from the event.
   *
   * @example
   * const unsubscribe = interceptorService.interceptor(callback, { eventName: "userLogin" });
   * unsubscribe(); // This is called to remove the interceptor.
   */
  interceptor = (callback: interceptorCallbackType, config: IInterceptor) => {
    const defaultConfig: IInterceptor = {
      ...config, // Ensures the config is initialized with the provided values.
    };
    const { eventName } = defaultConfig;

    // Check if there are existing interceptors for this event.
    // If there are none, create a new entry in the `interceptors` map.
    if (!this.interceptors.has(eventName)) {
      this.interceptors.set(eventName, [{ interceptor: callback }]);
    } else {
      // If interceptors already exist for this event, add the new interceptor to the list.
      let value = this.interceptors.get(eventName)!;
      value.push({ interceptor: callback });
      this.interceptors.set(eventName, value);
    }

    // Return a function that removes this interceptor when called.
    return () => {
      // Check if the event has interceptors registered.
      if (!this.interceptors.has(eventName)) return;

      let value = this.interceptors.get(eventName)!;
      // Remove the interceptor function from the list.
      value = value.filter((item) => item.interceptor != callback);

      // If no interceptors remain for this event, remove the event from the map.
      value.length === 0
        ? this.interceptors.delete(eventName)
        : this.interceptors.set(eventName, value);
    };
  };

  /**
   * Executes all registered interceptors for a given event and processes the event payload.
   * Each interceptor can modify the payload, and the resulting payload is returned.
   *
   * @param eventName The name of the event whose interceptors are executed.
   * @param payload The original data passed to the event, which will be processed by the interceptors.
   * @returns An object containing the processed payload after all interceptors have been executed.
   *
   * @example
   * const result = interceptorService.executeInterceptors("userLogin", payload);
   * console.log(result.payload); // Outputs the processed payload after interceptors.
   */
  executeInterceptors = (eventName: string, payload: any) => {
    // If no interceptors are registered for the event, return the original payload.
    if (!this.interceptors.has(eventName)) {
      return {
        payload: payload,
      };
    }

    // Clone the payload to avoid mutating the original data.
    let data = structuredClone(payload);

    // Iterate over each interceptor for the given event and apply them to the payload.
    this.interceptors.get(eventName)!.forEach(({ interceptor }) => {
      let result = interceptor({
        eventPayload: data,
      });

      // If the interceptor modifies the payload, update the data.
      if (result) {
        data = result;
      }
    });

    // Return the final processed payload after all interceptors have been executed.
    return {
      payload: data,
    };
  };
}
