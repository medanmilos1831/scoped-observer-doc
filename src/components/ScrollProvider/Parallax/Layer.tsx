import { forwardRef, PropsWithChildren } from 'react';
import { layerImage } from './layerImage';
import { ILayer } from '../types';

export const Layer = forwardRef(function Layer(
  {
    layer,
    parallaxProgres,
    zIndex = -1,
  }: {
    layer: ILayer;
    parallaxProgres: number;
    zIndex?: number;
  },
  ref: any
) {
  const { speed, imageUrl, children } = layer;
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: `${
            ref?.clientHeight! + (ref?.clientHeight! * speed) / 100
          }px`,
          transform: `translateY(${
            (-parallaxProgres * ref?.clientHeight! * speed) / 100
          }px)`,
          willChange: 'transform',
          ...layerImage(imageUrl),
          zIndex,
        }}
      >
        {children ? children : null}
      </div>
    </>
  );
});
