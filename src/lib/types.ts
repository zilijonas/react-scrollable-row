/**
 * You can set how many items will list display at given resolutions.
 * Default values:
 * `{ 480: 2, 768: 3, 1200: 4, max: 5 }`
 * Max stands for all resolutions that are bigger than the last of your defined ones (in this case >1500).
 * */
export type ItemsPerResolutionConfig = { [pixels: number]: number } & { max: number };

export interface SlideableProps {
  /**
   * Array of your list items. In order for dynamic items sizing to work, all items width must be set to `100%`.
   */
  items: JSX.Element[];
  /**
   * You can set how many items will list display at given resolutions.
   */
  itemsPerResolutionConfig?: ItemsPerResolutionConfig;
  /**
   * Margin between list items, px.
   */
  marginBetweenItems?: number;
  /**
   * Makes the list infinite by cloning the items of the list.
   * Elements count must be bigger than the list is able to display with the given `itemsPerResolutionConfig`.
   */
  looped?: boolean;
  /**
   * JSX Element to display when `looped` is set to `false`
   * and there are less items in the list than configuration lets list display.
   */
  placeholderElement?: JSX.Element;
  /**
   * Style of the arrow buttons.
   */
  buttonsStyle?: React.CSSProperties;
}
