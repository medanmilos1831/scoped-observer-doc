import { useContext } from 'react';
import { ScrollContext } from '../ScrollContext';

/**
 * Custom hook to access the scroll client for programmatic scrolling.
 * This hook provides a method to scroll the container to a specific position.
 *
 * @returns {{ scrollTo: (top: ScrollToOptions['top'], behavior?: ScrollToOptions['behavior']) => void }}
 * An object containing the `scrollTo` method to programmatically scroll to a specific position.
 */
export const useScrollClient = () => {
  // Access the ScrollContext to get the scroll-related methods and container
  const scroll = useContext(ScrollContext)!;

  return {
    // The `scrollTo` method to scroll to a specific position, passed down from the ScrollContext
    scrollTo: scroll.scrollTo,

    // The scrollable container element being tracked by the ScrollContext
    scrollContainer: scroll.scrollContainer,
  };
};
