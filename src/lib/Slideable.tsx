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
  marginBetweenItems = 0,
  itemsPerScrollWidth = DEFAULT_ITEMS_PER_RESOLUTION_CONFIG,
}) => {
  const { registerListRef, registerContainerRef, scrollBack, scrollForward, fittedItemsCount } = useSlideable({
    itemsPerScrollWidth,
    marginBetweenItems,
    looped,
    swipeable,
    noButtons,
  });
  const placeholdersCount = placeholderElement ? fittedItemsCount - items.length : 0;
  const marginRight = marginBetweenItems + 'px';

  return (
    <div ref={registerContainerRef} className={styles['container']} style={{ height, width, maxWidth: width }}>
      <div className={styles['buttonContainer']}>
        {customButtonLeft ? (
          <span onClick={scrollBack} className={`navButton ${styles['emptyButton']}`}>
            {customButtonLeft}
          </span>
        ) : (
          <button
            onClick={scrollBack}
            className={`navButton ${styles['emptyButton']} ${styles['button']}`}
            style={buttonsStyle}
          >
            <ArrowIcon />
          </button>
        )}
      </div>
      <div ref={registerListRef} className={styles['scrollableContent']}>
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
          <span onClick={scrollForward} className={`navButton ${styles['emptyButton']}`}>
            {customButtonRight}
          </span>
        ) : (
          <button
            onClick={scrollForward}
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
