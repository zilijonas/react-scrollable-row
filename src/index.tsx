import React from 'react';
import styles from './styles.module.css';
import smoothscroll from 'smoothscroll-polyfill';
import { ItemsPerResolutionConfig, useSlideable } from './hooks';
import { ArrowIcon } from './assets/ArrowIcon';

smoothscroll.polyfill();

interface Props {
  items: JSX.Element[];
  itemsPerResolutionConfig?: ItemsPerResolutionConfig;
  pixelsBetweenItems?: number;
  looped?: boolean;
  placeholder?: JSX.Element;
  arrowsStyle?: Partial<CSSStyleDeclaration>;
}

const DEFAULT_ITEMS_PER_RESOLUTION_CONFIG: ItemsPerResolutionConfig = {
  480: 2,
  900: 3,
  1500: 4,
  max: 5,
};

const SlideableComponent: React.FC<Props> = ({
  items,
  looped = false,
  placeholder,
  arrowsStyle = {},
  pixelsBetweenItems = 8,
  itemsPerResolutionConfig = DEFAULT_ITEMS_PER_RESOLUTION_CONFIG,
}) => {
  const { listRef, containerRef, scrollBack, scrollForward, itemsPerResolution } = useSlideable({
    itemsPerResolutionConfig,
    loopedScroll: looped,
    arrowsStyle,
    pixelsBetweenItems,
  });
  const placeholdersCount = placeholder ? itemsPerResolution - items.length : 0;
  const marginRight = pixelsBetweenItems + 'px';

  return (
    <div ref={containerRef} className={styles['container']}>
      <div className={styles['arrow-button-container']}>
        <button onClick={scrollBack} className={styles['arrow-button']}>
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
                {placeholder}
              </li>
            ))}
        </ul>
      </div>
      <div className={styles['arrow-button-container']}>
        <button onClick={scrollForward} className={styles['arrow-button']}>
          <ArrowIcon />
        </button>
      </div>
    </div>
  );
};

export const Slideable = React.memo(SlideableComponent);
