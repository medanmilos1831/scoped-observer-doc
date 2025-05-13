import { createContext } from 'react';
import { ScrollService } from './ScrollService';

const ScrollContext = createContext<ScrollService | undefined>(undefined);
export { ScrollContext };
