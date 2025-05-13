import { CopyBlock, dracula } from 'react-code-blocks';
import ShowCase from './ShowCase';

const OverlayExample = () => {
  return (
    <>
      <div className="overlay-service-page text-white p-8">
        <h1 className="text-4xl font-bold mb-8">
          Real-world Example: Building an Overlay Service
        </h1>
        <ShowCase />

        <p className="text-lg mb-6">
          In this example, we'll build a simple **Overlay Service** (for modals,
          drawers, etc.) using Scoped observer. Thanks to the event-driven
          design, we can open and close overlays across the app, completely
          decoupled from the component tree.
        </p>

        <h2 className="text-3xl font-semibold mb-8">1. The Concept</h2>
        <p className="mb-6">
          The **OverlayManager** manages different overlay types (like modals
          and drawers) and uses Scoped observer to dispatch "on" and "off"
          events. Each overlay is controlled via a scope, allowing clean and
          isolated event communication.
        </p>

        <CopyBlock
          language="tsx"
          text={`import { dispatch } from 'scoped-observer';
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
`}
          theme={dracula}
          codeBlock
        />

        <div className="my-8 border-t border-gray-700"></div>

        <h2 className="text-3xl font-semibold mb-8">
          2. Listening to Overlay Events
        </h2>
        <p className="mb-6">
          Now we'll create an **OverlayController** component that listens for
          "on" and "off" events in a specific scope and renders accordingly.
        </p>

        <CopyBlock
          language="tsx"
          text={`import { JSX, useEffect, useRef, useState } from 'react';
import { STATUS_ENUM } from './types';
import { overlayManager } from './OverlayManager';
import { subscribe } from 'scoped-observer';

export const OverlayController = ({
  children,
  eventName,
  scope,
}: {
  children: (params: {
    status: STATUS_ENUM;
    off: () => void;
    data: any;
  }) => JSX.Element;
  eventName: string;
  scope: string;
}) => {
  const [status, setStatus] = useState<STATUS_ENUM>(STATUS_ENUM.OFF);
  const data = useRef<any>(null);

  useEffect(() => {
    const unsubscribe = subscribe({
      scope,
      eventName,
      callback({ payload }) {
        data.current = payload.status === STATUS_ENUM.OFF ? null : payload.data;
        setStatus(() => payload.status);
      },
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      {children({
        status,
        off: () => overlayManager(scope).off(eventName),
        data: data.current,
      })}
    </>
  );
};
`}
          theme={dracula}
          codeBlock
        />

        <div className="my-8 border-t border-gray-700"></div>

        <h2 className="text-3xl font-semibold mb-8">
          3. Putting it All Together
        </h2>
        <p className="mb-6">
          Finally, here’s how to use the overlay manager and controller in your
          components.
        </p>

        <CopyBlock
          language="tsx"
          text={`import { Modal } from './Modal';
import { OverlayController } from './overlayManager/OverlayController';
import { overlayManager } from './overlayManager/OverlayManager';

export const OverlayExample = () => {
  return (
    <div className="text-white">
      <OverlayController scope="modal" eventName="modalOne">
        {({ data, off, status }) => (
          <Modal
            modalName="modalOne"
            modalProps={(data: any) => ({
              title: data?.id ? 'Item Available' : 'No Item',
            })}
          >
            <>Some Content</>
          </Modal>
        )}
      </OverlayController>

      <button
        onClick={() => {
          overlayManager('modal').on('modalOne');
        }}
      >
        Open Modal One
      </button>

      <br />

      <button
        onClick={() => {
          overlayManager('drawer').on('drawerOne', {
            id: 'some-id',
          });
        }}
      >
        Open Drawer One
      </button>
    </div>
  );
};
`}
          theme={dracula}
          codeBlock
        />

        <div className="my-8 border-t border-gray-700"></div>

        <p className="mt-8">
          By combining **scopes**, **event dispatching**, and a simple
          event-driven controller component, we built a clean, flexible Overlay
          Service without tight component coupling. This method easily scales to
          more overlays like popups, side panels, confirmations, and more.
        </p>
      </div>
    </>
  );
};

export { OverlayExample };
