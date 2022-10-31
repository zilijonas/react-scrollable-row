/**
 * You can set how many items will list display at given resolutions.
 * Default values:
 * `{ 480: 2, 768: 3, 1200: 4, max: 5 }`
 * Max stands for all resolutions that are bigger than the last of your defined ones (in this case >1500).
 * */
export type ItemsPerScrollWidthConfig = { [pixels: number]: number } & { max: number };

export interface SlideableProps {
  /**
   * Array of your list items. In order for dynamic items sizing to work, all items width must be set to `100%`.
   */
  items: JSX.Element[];
  /**
   * Height of the list. Defaults to items height if undefined.
   */
  height?: number;
  /**
   * Width of the list. Defaults to `100%`.
   */
  width?: number | '100%';
  /**
   * You can set how many items will list display at given resolutions.
   */
  config?: ItemsPerScrollWidthConfig;
  /**
   * Margin between list items, px.
   */
  itemsMargin?: number;
  /**
   * Makes the list infinite by cloning the items of the list.
   */
  looped?: boolean;
  /**
   * Enables scroll by swipe.
   */
  swipeable?: boolean;
  /**
   * Removes scroll buttons.
   */
  noButtons?: boolean;
  /**
   * JSX Element to display when `looped` is set to `false`
   * and there are less items in the list than in the configuration for the current scroll width.
   */
  placeholderElement?: JSX.Element;
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
}
