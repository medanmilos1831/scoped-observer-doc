import { dispatch } from '../../../../scoped-observer';
import { ON_OFF_ENTITIES, STATUS_ENUM } from './types';

class OnOffEntity {
  private scope: string;
  constructor(scope: string) {
    this.scope = scope;
  }
  on(eventName: string, data?: any) {
    dispatch({
      scope: this.scope,
      eventName,
      payload: {
        status: STATUS_ENUM.ON,
        data,
      },
    });
  }
  off(eventName: string) {
    dispatch({
      scope: this.scope,
      eventName,
      payload: {
        status: STATUS_ENUM.OFF,
        data: undefined,
      },
    });
  }
}

class OverlayManager {
  private overlays: { [key: string]: OnOffEntity } = {};
  constructor() {
    this.overlays[ON_OFF_ENTITIES.MODAL] = new OnOffEntity(
      ON_OFF_ENTITIES.MODAL
    );
    this.overlays[ON_OFF_ENTITIES.DRAWER] = new OnOffEntity(
      ON_OFF_ENTITIES.DRAWER
    );
  }
  scope = (scope: string) => {
    return this.overlays[scope];
  };
}
export const overlayManager = new OverlayManager().scope;
