import React from 'react';
import styles from '../styles.module.css';
import { useSlideable } from './hooks';
import { ArrowIcon } from '../assets/ArrowIcon';
import { DEFAULT_ITEMS_PER_RESOLUTION_CONFIG } from './constants';
import { SlideableProps } from './types';

const SlideableComponent: React.FC<SlideableProps> = ({
  items,
  buttonsStyle,
  looped = false,
  width = '100%',
  height = 'auto',
  placeholderElement,
  marginBetweenItems = 0,
  itemsPerScrollWidth = DEFAULT_ITEMS_PER_RESOLUTION_CONFIG,
}) => {
  const { registerListRef, registerContainerRef, scrollBack, scrollForward, fittedItemsCount } = useSlideable({
    itemsPerScrollWidth,
    marginBetweenItems,
    looped,
  });
  const placeholdersCount = placeholderElement ? fittedItemsCount - items.length : 0;
  const marginRight = marginBetweenItems + 'px';

  return (
    <div ref={registerContainerRef} className={styles['container']} style={{ height, width }}>
      <div className={styles['buttonContainer']}>
        <button onClick={scrollBack} className={styles['button']} style={buttonsStyle}>
          <ArrowIcon />
        </button>
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
        <button onClick={scrollForward} className={styles['button']} style={buttonsStyle}>
          <ArrowIcon />
        </button>
      </div>
    </div>
  );
};

export const Slideable = React.memo(SlideableComponent);
