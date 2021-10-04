import React from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import { ItemsPerResolutionConfig, useScrollableRow } from './hook';
import styles from './styles.module.css';

smoothscroll.polyfill();

interface Props {
  items: React.ReactNode;
  itemsPerResolution?: ItemsPerResolutionConfig;
  marginBetweenItems?: number | string;
  looped?: boolean;
  arrowsStyles?: CSSStyleDeclaration;
}

const DEFAULT_ITEMS_PER_RESOLUTION: ItemsPerResolutionConfig = {
  900: 3,
  1500: 4,
  max: 5,
};

const SlideableComponent: React.FC<Props> = ({
  items,
  looped,
  arrowsStyles,
  marginBetweenItems = '8px',
  itemsPerResolution = DEFAULT_ITEMS_PER_RESOLUTION,
}) => {
  const { listRef, containerRef, scrollBack, scrollForward } = useScrollableRow(
    itemsPerResolution,
    looped,
    arrowsStyles,
  );

  return (
    <div className={styles['container']} ref={containerRef}>
      <div className={styles['arrow-button-container']}>
        <button onClick={scrollBack} className={styles['arrow-button']}>
          {'<'}
        </button>
      </div>
      <div ref={listRef} className={styles['scrollable-content']}>
        <ul data-current="0" className={styles['list']}>
          {Array.isArray(items) ? (
            items.map((c, idx) => (
              <li key={idx} className={styles['list-item']} style={{ marginRight: marginBetweenItems }}>
                {c}
              </li>
            ))
          ) : (
            <li className={styles['list-item']} style={{ marginRight: marginBetweenItems }}>
              {items}
            </li>
          )}
        </ul>
      </div>
      <div className={styles['arrow-button-container']}>
        <button onClick={scrollForward} className={styles['arrow-button']}>
          {'>'}
        </button>
      </div>
    </div>
  );
};

export const Slideable = React.memo(SlideableComponent);
