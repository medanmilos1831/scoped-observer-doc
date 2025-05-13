import {
  IScrollConfig,
  IScrollProvider,
  SCROLL_DIRECTION,
  scrollItem,
  subscribeObject,
} from './types';

/**
 * ScrollService manages the scroll state, handles scroll events,
 * and provides utilities to interact with the scrollable element.
 */
class ScrollService {
  /**
   * A map of subscribed items, keyed by their DOM elements.
   * Each entry includes a callback and a flag to check if the item should update.
   */
  observer = new Map<
    HTMLElement | ((props: scrollItem) => void),
    subscribeObject
  >();

  /**
   * Current vertical scroll position of the tracked element.
   */
  scrollPosition = 0;

  /**
   * Current scroll direction (up or down).
   */
  direction: SCROLL_DIRECTION = SCROLL_DIRECTION.DOWN;

  /**
   * Scroll progress as a percentage (0 to 100).
   */
  progress: number | undefined = undefined;

  /**
   * Configuration object for scroll-related callbacks and options.
   * Allows custom behavior for scrolling events like throttling, top, and bottom actions.
   */
  config: IScrollConfig = {
    scrolling: undefined,
    onTop: undefined,
    onBottom: undefined,
    throttle: 0,
  };

  /**
   * Reference to the scrollable HTML element being tracked.
   */
  scrollContainer: HTMLDivElement | null = null;

  /**
   * Creates an instance of ScrollService.
   * The optional configuration provider allows you to customize scroll event handling.
   *
   * @param {IScrollProvider | undefined} config - Optional configuration for scroll event handling.
   */
  constructor(config?: IScrollProvider) {
    if (config) {
      this.config = {
        ...this.config,
        ...config,
      };
    }
  }

  /**
   * Sets the scrollable element to be tracked and initializes progress calculation.
   *
   * @param {HTMLDivElement | null} el - The scrollable element to track.
   */
  setScrollContainer = (el: HTMLDivElement | null): void => {
    this.scrollContainer = el;
    this.calculateProgress();
  };

  /**
   * Throttles the given scroll event handler to prevent excessive calls within a time interval.
   *
   * @param {Function} fn - The scroll handler function.
   * @param {number} delay - The throttle delay in milliseconds.
   * @returns {Function} A throttled version of the provided function.
   */
  private throttle = (fn: ScrollService['onScroll'], delay: any) => {
    let time = Date.now();

    return (e: any) => {
      if (time + delay - Date.now() <= 0) {
        fn(e);
        time = Date.now();
      }
    };
  };

  /**
   * Handles the scroll event by determining scroll direction, updating scroll position,
   * and triggering relevant callbacks for top/bottom actions and progress.
   *
   * @param {Event} e - The scroll event object.
   */
  private onScroll = (e: any) => {
    const target = e.target as HTMLDivElement;

    // Determine scroll direction
    this.direction =
      target.scrollTop > this.scrollPosition
        ? SCROLL_DIRECTION.DOWN
        : SCROLL_DIRECTION.UP;

    // Update scroll position
    this.scrollPosition = target.scrollTop;

    // Trigger provider callbacks
    if (this.config.scrolling) {
      this.config.scrolling({
        scrollPosition: this.scrollPosition,
        direction: this.direction,
      });
    }
    if (this.config.onTop && this.scrollPosition === 0) {
      this.config.onTop();
    }
    // obj.scrollTop === (obj.scrollHeight - obj.offsetHeight)
    if (
      this.config.onBottom &&
      Math.ceil(this.scrollPosition) >=
        Math.floor(
          this.scrollContainer!.scrollHeight -
            this.scrollContainer!.clientHeight
        )
    ) {
      this.config.onBottom();
    }

    // Calculate scroll progress and notify subscribers
    this.calculateProgress();
    this.notify();
  };

  /**
   * Calculates the current scroll progress as a percentage (0-100) based on the scroll position.
   */
  private calculateProgress(): void {
    if (this.scrollContainer) {
      const totalScrollable =
        this.scrollContainer.scrollHeight - this.scrollContainer.clientHeight;
      this.progress = Math.floor((this.scrollPosition / totalScrollable) * 100);
    }
  }

  /**
   * Notifies all subscribed items about the current scroll state if they are marked to update.
   * Each subscribed item has a callback that gets called when its conditions are met.
   */
  private notify(): void {
    for (const [_, { callback }] of this.observer) {
      callback({
        scrollPosition: this.scrollPosition,
        direction: this.direction,
        progress: this.progress,
        scrollContainer: this.scrollContainer,
      });
    }
  }

  /**
   * Subscribes a new element to receive scroll state updates.
   * The element is tracked for visibility and scroll progress.
   *
   * @param {subscribeObject} obj - The subscription object containing the element and callback.
   * @returns {() => void} - A function to unsubscribe the element from scroll updates.
   */
  subscribe = (obj: subscribeObject): (() => void) => {
    this.observer.set(obj.callback, obj);

    // Return unsubscribe function
    return () => {
      this.observer.delete(obj.callback);
    };
  };
  /**
   * Scrolls the tracked element to a specific vertical position.
   *
   * @param {number} top - The vertical position to scroll to (in pixels).
   * @param {'auto' | 'smooth'} [behavior='smooth'] - Defines the scroll behavior: 'smooth' or 'auto'.
   */
  scrollTo = (
    top: number,
    behavior: ScrollToOptions['behavior'] = 'smooth'
  ): void => {
    this.scrollContainer?.scrollTo({
      top,
      behavior,
    });
  };

  /**
   * Returns the correct scroll handler, using throttling if configured.
   */
  scrollHandler = () => {
    if (this.config.throttle > 0) {
      return this.throttle(this.onScroll, this.config.throttle);
    }
    return this.onScroll;
  };
}

export { ScrollService };
