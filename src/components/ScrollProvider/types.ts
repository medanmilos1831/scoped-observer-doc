import { ReactNode } from 'react';
import { ScrollService } from './ScrollService';

/**
 * Defines the structure of the scroll event handler functions.
 * The provider contains optional callbacks for scroll events.
 */
export interface IScrollProvider {
  /**
   * Callback function that is triggered on each scroll event.
   *
   * @param {object} obj - The object containing the scroll state.
   * @param {number} obj.scrollPosition - The current vertical scroll position.
   * @param {SCROLL_DIRECTION} obj.direction - The direction of the scroll (UP or DOWN).
   */
  scrolling?(obj: {
    scrollPosition: number; // The current scroll position (vertical).
    direction: SCROLL_DIRECTION; // The scroll direction (either UP or DOWN).
  }): void;

  /**
   * Callback function that is triggered when the scroll reaches the top.
   */
  onTop?(): void;

  /**
   * Callback function that is triggered when the scroll reaches the bottom.
   */
  onBottom?(): void;

  throttle?: number;
}

export interface IScrollConfig {
  /**
   * Callback function that is triggered on each scroll event.
   *
   * @param {object} obj - The object containing the scroll state.
   * @param {number} obj.scrollPosition - The current vertical scroll position.
   * @param {SCROLL_DIRECTION} obj.direction - The direction of the scroll (UP or DOWN).
   */
  scrolling:
    | ((obj: {
        scrollPosition: number; // The current scroll position (vertical).
        direction: SCROLL_DIRECTION; // The scroll direction (either UP or DOWN).
      }) => void)
    | undefined;

  /**
   * Callback function that is triggered when the scroll reaches the top.
   */
  onTop: (() => void) | undefined;

  /**
   * Callback function that is triggered when the scroll reaches the bottom.
   */
  onBottom: (() => void) | undefined;

  throttle: number;
}

/**
 * Enum representing the possible directions of scrolling.
 */
export enum SCROLL_DIRECTION {
  UP = 'UP', // Scroll direction is upwards.
  DOWN = 'DOWN', // Scroll direction is downwards.
}

/**
 * Type representing a dispatch function to update the state of a scroll item.
 * This type is used to update the scroll state in components that subscribe to the scroll context.
 */
export type scrollItemDispatch = React.Dispatch<
  React.SetStateAction<scrollItem>
>;

/**
 * Type representing a scroll item state that holds information about the scroll position and direction.
 */
export type scrollItem = {
  /**
   * The current vertical scroll position.
   */
  scrollPosition: number;

  /**
   * The direction of the scroll (either UP or DOWN).
   */
  direction: SCROLL_DIRECTION;

  /**
   * The progress of the scroll (in percentage).
   */
  progress: number | undefined;
  scrollContainer: HTMLDivElement | null;
};

/**
 * Type representing the object passed to the ScrollService's `subscribe` method.
 * This object tracks the scroll state of a specific element and its update behavior.
 */
export type subscribeObject = {
  /**
   * Callback function triggered on scroll updates.
   */
  callback: (props: scrollItem) => void;
};

export interface IScrollClient {
  scrollTo: ScrollService['scrollTo'];
  scrollContainer: HTMLDivElement | null;
}

export interface ILayer {
  imageUrl?: any;
  speed: number;
  children?: ReactNode;
}
