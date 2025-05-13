import {
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSubscribeSubject } from '../hooks/useSubscribeSubject';
import { ScrollContext } from '../ScrollContext';
import { ILayer, scrollItem } from '../types';
import { Layer } from './Layer';

export const ParallaxBanner = ({
  layers,
  children,
}: PropsWithChildren<{
  layers: ILayer[];
}>) => {
  const scroll = useContext(ScrollContext)!;

  // Reference to the container div for the parallax effect
  const ref = useRef<HTMLDivElement>(null);

  // State to track the progress of the parallax effect
  const [parallaxProgres, setParallaxProgress] = useState<number | null>(null);

  // Custom hook for subscribing to scroll updates
  const [subject, setSubject] = useSubscribeSubject();

  /**
   * Callback function to update the scroll state for the component.
   * This is memoized to avoid re-subscriptions during re-renders.
   */
  const [callback] = useState(() => {
    return (props: scrollItem) => {
      setSubject((prev) => ({
        ...prev, // Retain previous state
        ...props, // Merge new scroll data
      }));
    };
  });

  // Map to store unsubscribe functions for each observed element
  const unsubscribeMap = useRef(new Map<Element, () => void>());

  /**
   * Unsubscribe the scroll updates for a specific element.
   *
   * @param {Element} entry - The DOM element to unsubscribe.
   */
  function unSubscriber(entry: Element) {
    const unsubscribe = unsubscribeMap.current.get(entry);
    if (unsubscribe) {
      unsubscribe(); // Call the stored unsubscribe function
      unsubscribeMap.current.delete(entry); // Remove from map
    }
  }

  // Effect to set up the IntersectionObserver and handle subscriptions
  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // When the element enters the viewport, subscribe to scroll updates
          const unsubscribe = scroll.subscribe({ callback });
          unsubscribeMap.current.set(entry.target, unsubscribe);
        } else {
          // When the element exits the viewport, unsubscribe
          unSubscriber(entry.target);
        }
      });
    });

    if (ref.current) {
      intersectionObserver.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        // Clean up on unmount or ref change
        intersectionObserver.unobserve(ref.current);
        unSubscriber(ref.current);
      }
    };
  }, []);

  // Effect to calculate the parallax progress
  useEffect(() => {
    if (!ref.current || !scroll.scrollContainer) return;
    // Height of the element and the scroll container
    const elementHeight = ref.current.clientHeight;
    const wrapperHeight =
      scroll.scrollContainer.getClientRects().item(0)?.height! + elementHeight;

    // Calculate the position of the element relative to the scroll container
    const elementBottomPosition = ref.current.getBoundingClientRect().bottom;
    const value =
      wrapperHeight -
      (elementBottomPosition -
        scroll.scrollContainer.getClientRects().item(0)?.top!);

    // Calculate progress as a ratio
    const progress = value / wrapperHeight;
    setParallaxProgress(() => {
      return progress as number;
    });
  }, [subject.scrollPosition]);
  return (
    <>
      <div
        ref={ref}
        style={{
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <>
          {layers.map((layer, index) => {
            return (
              <Layer
                layer={layer}
                ref={ref.current as any}
                parallaxProgres={parallaxProgres!}
                zIndex={index * -1}
              />
            );
          })}
          {children}
        </>
      </div>
    </>
  );
};
