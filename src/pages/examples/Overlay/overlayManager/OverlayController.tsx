import { JSX, useEffect, useRef, useState } from 'react';
import { STATUS_ENUM } from './types';
import { overlayManager } from './OverlayManager';
import { subscribe } from '../../../../scoped-observer';

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
