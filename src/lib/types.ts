/**
 * You can set how many items will list display at given resolutions.
 * Default values:
 * `{ 480: 2, 768: 3, 1200: 4, max: 5 }`
 * `max` is for resolutions higher than `1200`.
 * */
export type DisplayConfig = ({ [pixels: number]: number } & { max: number }) | number;

export type SlideDirection = 'forward' | 'back';

export type SlideType = 'finite' | 'infinite';

export interface SlideableProps {
  /**
   * Type of the list. Available options: `finite` | `infinite`. Default is `finite`.
   */
  type?: SlideType;
  /**
   * Enables scroll by swipe.
   */
  swipeable?: boolean;
  /**
   * Array of your list items. In order for dynamic items sizing to work,
   * all items style property `width` must be set to `100%`.
   */
  items: JSX.Element[];
  /**
   * Margin between list items, px. Defaults to 0.
   */
  itemsGap?: number;
  /**
   * Height of the list. Defaults to items height.
   */
  height?: number;
  /**
   * Width of the list. Defaults to `100%`.
   */
  width?: number | '100%';
  /**
   * Removes scroll buttons.
   */
  noButtons?: boolean;
  /**
   * JSX Element to display when `looped` is set to `false`
   * and there are less items in the list than in the configuration for the current scroll width.
   */
  placeholder?: JSX.Element;
  /**
   * Style of the arrow buttons.
   */
  buttonsStyle?: React.CSSProperties;
  /**
   * Custom button for scroll to left.
   */
  customButtonLeft?: JSX.Element;
  /**
   * Custom button for scroll to right.
   */
  customButtonRight?: JSX.Element;
  /**
   * You can set how many items will list display at given resolutions.
   */
  displayConfig?: DisplayConfig;
  /**
   * Callback function that will be called when the list is scrolled.
   */
  onScrolled?: (direction: SlideDirection) => void;
}
