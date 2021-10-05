import React from 'react';
import styles from './styles.module.css';
import smoothscroll from 'smoothscroll-polyfill';
import { ItemsPerResolutionConfig, useSlideable } from './hooks';
import { ArrowIcon } from './assets/ArrowIcon';

smoothscroll.polyfill();

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
   * Margin between list items.
   */
  pixelsBetweenItems?: number;
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

const DEFAULT_ITEMS_PER_RESOLUTION_CONFIG: ItemsPerResolutionConfig = {
  480: 2,
  900: 3,
  1500: 4,
  max: 5,
};

const SlideableComponent: React.FC<SlideableProps> = ({
  items,
  looped = false,
  buttonsStyle,
  placeholderElement,
  pixelsBetweenItems = 0,
  itemsPerResolutionConfig = DEFAULT_ITEMS_PER_RESOLUTION_CONFIG,
}) => {
  const { listRef, containerRef, scrollBack, scrollForward, renderedFittedItemsCount } = useSlideable({
    itemsPerResolutionConfig,
    pixelsBetweenItems,
    looped,
  });
  const placeholdersCount = placeholderElement ? renderedFittedItemsCount - items.length : 0;
  const marginRight = pixelsBetweenItems + 'px';

  return (
    <div ref={containerRef} className={styles['container']}>
      <div className={styles['arrow-button-container']}>
        <button onClick={scrollBack} className={styles['arrow-button']} style={buttonsStyle}>
          <ArrowIcon />
        </button>
      </div>
      <div ref={listRef} className={styles['scrollable-content']}>
        <ul data-current="0" className={styles['list']}>
          {items.map((c, idx) => (
            <li key={idx} className={styles['list-item']} style={{ marginRight }}>
              {c}
            </li>
          ))}
          {placeholdersCount > 0 &&
            Array.from(Array(placeholdersCount).keys()).map(k => (
              <li key={k} className={styles['list-item']} style={{ marginRight }}>
                {placeholderElement}
              </li>
            ))}
        </ul>
      </div>
      <div className={styles['arrow-button-container']}>
        <button onClick={scrollForward} className={styles['arrow-button']} style={buttonsStyle}>
          <ArrowIcon />
        </button>
      </div>
    </div>
  );
};

export const Slideable = React.memo(SlideableComponent);
