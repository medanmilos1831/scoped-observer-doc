import { PropsWithChildren, useContext, useState } from 'react';
import { useScrollClient, useScrollWatch } from './hooks';
import { ScrollContext } from './ScrollContext';
import { ScrollService } from './ScrollService';
import { IScrollClient, IScrollProvider } from './types';

/**
 * ScrollProvider is a React component that provides a scrollable container
 * and manages scroll behavior using the ScrollService. It also exposes
 * the scroll state to its child components via the ScrollContext.
 *
 * The component can be configured via the `config` prop to customize scroll
 * event callbacks and other scroll behaviors.
 *
 * @param {PropsWithChildren<{ config?: IScrollProvider }>} props - The props for the ScrollProvider component.
 * @param {IScrollProvider} [props.config] - Optional configuration for scroll event callbacks and behaviors.
 *
 * @returns {JSX.Element} The ScrollProvider component that wraps the children with scroll management logic.
 */
const ScrollProvider = ({
  children,
  config,
}: PropsWithChildren<{ config?: IScrollProvider }>) => {
  // Initialize the ScrollService instance with optional configuration
  const [state, _] = useState(init);

  /**
   * Initializes the ScrollService with the provided configuration.
   * The ScrollService is responsible for handling scroll behavior and events.
   */
  function init() {
    return new ScrollService(config);
  }

  return (
    <ScrollContext.Provider value={state}>
      <>{children}</>
    </ScrollContext.Provider>
  );
};

/**
 * Container component that provides a scrollable element. It uses the
 * ScrollContext to interact with the ScrollService and handle scroll events.
 *
 * The `Container` component listens to scroll events and passes them to the
 * ScrollService for processing, managing scroll behaviors like throttling
 * and callback invocations.
 *
 * @param {PropsWithChildren} props - The children to be rendered within the scrollable container.
 *
 * @returns {JSX.Element} A container element that can be scrolled and interacts with ScrollService.
 */
ScrollProvider.Container = ({ children }: PropsWithChildren) => {
  const scroll = useContext(ScrollContext)!;
  const [init, setInit] = useState<HTMLDivElement | null>(null);
  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100%',
          width: '100%',
          overflowY: 'scroll',
        }}
        ref={(e) => {
          setInit(e);
          scroll.setScrollContainer(e);
        }} // Set the scrollable element in ScrollService
        onScroll={scroll.scrollHandler()} // Handle scroll events
      >
        <>{init ? children : null}</>
      </div>
    </div>
  );
};

/**
 * Client component that allows child components to access the current scroll state
 * via the ScrollClient. It provides a higher-order component pattern, where the
 * children function receives the ScrollClient as an argument.
 *
 * The ScrollClient provides methods and state related to scroll behavior, such as
 * retrieving the current scroll position, direction, or progress.
 *
 * @param {Object} props - The children function that receives the ScrollClient instance.
 * @param {(item: IScrollClient) => JSX.Element} props.children - A function that receives the ScrollClient instance.
 *
 * @returns {JSX.Element} A component that renders the children with the ScrollClient instance.
 */
ScrollProvider.Client = ({
  children,
}: {
  children: (item: IScrollClient) => JSX.Element;
}) => {
  const client = useScrollClient()!; // Access the ScrollContext from the provider
  return <>{children(client)}</>;
};

export { ScrollProvider, useScrollClient, useScrollWatch };
