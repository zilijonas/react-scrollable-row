import React from 'react';
import { ArrowIcon } from '../assets/ArrowIcon';
import styles from '../styles.module.css';
import { DEFAULT_ITEMS_PER_RESOLUTION_CONFIG } from './constants';
import { useSlideable } from './hooks';
import { SlideableProps } from './types';

const SlideableComponent: React.FC<SlideableProps> = ({
  items,
  buttonsStyle,
  noButtons = false,
  looped = false,
  swipeable = false,
  width = '100%',
  height = 'auto',
  customButtonLeft,
  customButtonRight,
  placeholderElement,
  itemsMargin = 0,
  config = DEFAULT_ITEMS_PER_RESOLUTION_CONFIG,
}) => {
  const slideable = useSlideable({ itemsMargin, config, looped, swipeable, noButtons });
  const placeholdersCount = placeholderElement ? slideable.fittedItemsCount - items.length : 0;
  const marginRight = itemsMargin + 'px';

  return (
    <div
      ref={slideable.registerContainerRef}
      className={styles['container']}
      style={{ height, width, maxWidth: width }}
    >
      <div className={styles['buttonContainer']}>
        {customButtonLeft ? (
          <span onClick={slideable.scrollBack} className={`navButton ${styles['emptyButton']}`}>
            {customButtonLeft}
          </span>
        ) : (
          <button
            onClick={slideable.scrollBack}
            className={`navButton ${styles['emptyButton']} ${styles['button']}`}
            style={buttonsStyle}
          >
            <ArrowIcon />
          </button>
        )}
      </div>
      <div ref={slideable.registerListRef} className={styles['scrollableContent']}>
        <ul data-current="0" className={styles['list']}>
          {items.map((c, idx) => (
            <li key={idx} className={styles['listItem']} style={{ marginRight }}>
              {c}
            </li>
          ))}
          {placeholdersCount > 0 &&
            Array.from(Array(placeholdersCount).keys()).map(k => (
              <li key={k} className={styles['listItem']} style={{ marginRight }}>
                {placeholderElement}
              </li>
            ))}
        </ul>
      </div>
      <div className={styles['buttonContainer']}>
        {customButtonRight ? (
          <span onClick={slideable.scrollForward} className={`navButton ${styles['emptyButton']}`}>
            {customButtonRight}
          </span>
        ) : (
          <button
            onClick={slideable.scrollForward}
            className={`navButton ${styles['emptyButton']} ${styles['button']}`}
            style={buttonsStyle}
          >
            <ArrowIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export const Slideable = React.memo(SlideableComponent);
