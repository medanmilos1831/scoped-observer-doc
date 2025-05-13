import { useContext, useState } from 'react';
import { scrollItem, SCROLL_DIRECTION } from '../types';
import { ScrollContext } from '../ScrollContext';

const useSubscribeSubject = () => {
  const scroll = useContext(ScrollContext)!;
  const subject = useState<scrollItem>({
    scrollPosition: 0, // Initial scroll position
    direction: SCROLL_DIRECTION.DOWN, // Initial scroll direction
    progress: 0, // Initial scroll progress
    scrollContainer: scroll.scrollContainer, // The scrollable container
  });
  return subject;
};

export { useSubscribeSubject };
