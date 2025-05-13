import { EventManager } from './EventManager';

let manager = new EventManager();
const dispatch = manager.managerAction;
const subscribe = manager.managerSubscribe;
const eventInterceptor = manager.managerEventInterceptor;
const configEventManager = manager.configEventManager;
const autoBindListeners = manager.autoBindListeners;
const logging = manager.logging;
console.log('MANAGER', manager);
export {
  dispatch,
  eventInterceptor,
  subscribe,
  configEventManager,
  autoBindListeners,
  logging,
};
