import { useContext, useEffect } from 'react';
import { ScrollContext } from '../ScrollContext';
import { scrollItem } from '../types';
import { useSubscribeSubject } from './useSubscribeSubject';

/**
 * Custom hook that subscribes to the ScrollContext to track the scroll state
 * of a specific scroll container. It returns the scroll position, direction,
 * progress, and the scroll container state.
 *
 * This hook listens to the scroll event and updates the component whenever
 * the scroll position or direction changes.
 *
 * @returns {scrollItem} The current scroll state, including:
 *   - scrollPosition: The current scroll position (in pixels).
 *   - direction: The current scroll direction, either SCROLL_DIRECTION.DOWN or SCROLL_DIRECTION.UP.
 *   - progress: The scroll progress as a percentage (0-100).
 *   - scrollContainer: The scrollable container element being tracked.
 */
const useScrollWatch = () => {
  const scroll = useContext(ScrollContext)!;

  const [subject, setSubject] = useSubscribeSubject();

  // Subscribe to scroll events on mount and update the state with new scroll data
  useEffect(() => {
    // Subscribe to scroll state updates from the ScrollService
    let unsubscribe = scroll.subscribe({
      callback: (props) => {
        // Update the scroll state for the item whenever new scroll data is available
        setSubject((prev) => ({
          ...prev, // Retain the previous state
          ...props, // Merge the new scroll data
        }));
      },
    });

    // Cleanup the subscription when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []); // Only run the effect once on mount

  // Return the current scroll state
  return subject;
};

export { useScrollWatch };
