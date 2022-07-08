import React, { useCallback, useState } from 'react';
import { ArrowIcon } from '../assets/ArrowIcon';
import styles from '../styles.module.css';
import { DEFAULT_ITEMS_PER_RESOLUTION_CONFIG } from './constants';
import { ContainerElement, ScrollableElement } from './elements';
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
  const [list, setList] = useState<ScrollableElement | null>(null);
  const [container, setContainer] = useState<ContainerElement | null>(null);
  const slideable = useSlideable({ list, container, itemsMargin, config, looped, swipeable, noButtons });
  const placeholdersCount = placeholderElement ? slideable.fittedItemsCount - items.length : 0;

  return (
    <div
      ref={useCallback((ref: HTMLDivElement) => setContainer(new ContainerElement(ref)), [])}
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
            id="button-back"
            aria-label="Back"
            onClick={slideable.scrollBack}
            className={`navButton ${styles['emptyButton']} ${styles['button']}`}
            style={buttonsStyle}
          >
            <ArrowIcon />
          </button>
        )}
      </div>
      <div
        ref={useCallback((ref: HTMLDivElement) => setList(new ScrollableElement(ref)), [])}
        className={styles['scrollableContent']}
      >
        <ul data-current="0" className={styles['list']}>
          {items.map((c, idx) => (
            <li key={idx} className={styles['listItem']} style={{ marginRight: `${itemsMargin}px` }}>
              {c}
            </li>
          ))}
          {placeholdersCount > 0 &&
            Array.from(Array(placeholdersCount).keys()).map(k => (
              <li key={k} className={styles['listItem']} style={{ marginRight: `${itemsMargin}px` }}>
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
            id="button-right"
            aria-label="Forward"
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
