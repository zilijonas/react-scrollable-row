import React, { useState } from 'react';
import { ArrowIcon } from '../assets/ArrowIcon';
import styles from '../styles.module.css';
import { DEFAULT_ITEMS_PER_RESOLUTION_CONFIG } from './constants';
import { SlideableProps } from './types';
import { useItemsShifter } from './_hooks/useClones';
import { useItemsPerDisplayCount } from './_hooks/useItemsPerDisplayCount';
import { useScroll } from './_hooks/useScroll';

const InfiniteSlider: React.FC<SlideableProps> = ({
  items,
  buttonsStyle,
  // noButtons = false,
  // looped = false,
  // swipeable = false,
  width = '100%',
  height = 'auto',
  customButtonLeft,
  customButtonRight,
  placeholderElement,
  itemsMargin = 0,
  config = DEFAULT_ITEMS_PER_RESOLUTION_CONFIG,
}) => {
  const [list, setList] = useState<HTMLDivElement | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const containerWidth = container?.clientWidth ?? 0;
  const shifter = useItemsShifter(items);
  const { itemsPerDisplay } = useItemsPerDisplayCount(config, containerWidth);
  const scroll = useScroll(list, itemsPerDisplay, containerWidth);
  const placeholdersCount = placeholderElement ? itemsPerDisplay - items.length : 0;
  const itemWidth = containerWidth / itemsPerDisplay - itemsMargin;

  return (
    <div ref={setContainer} className={styles['container']} style={{ height, width, maxWidth: width }}>
      <div className={styles['buttonContainer']}>
        {customButtonLeft ? (
          <span onClick={handleGoBack} className={`navButton ${styles['emptyButton']}`}>
            {customButtonLeft}
          </span>
        ) : (
          <button
            id="button-back"
            aria-label="Back"
            onClick={handleGoBack}
            className={`navButton ${styles['emptyButton']} ${styles['button']}`}
            style={buttonsStyle}
          >
            <ArrowIcon />
          </button>
        )}
      </div>
      <div className={styles['scrollableContent']} ref={setList}>
        <ul data-current="0" className={styles['list']}>
          {shifter.shiftedItems.map(item => (
            <li
              key={item.key}
              id={item.index.toString()}
              className={styles['listItem2']}
              style={{ minWidth: `${itemWidth}px`, width: `${itemWidth}px`, marginRight: `${itemsMargin}px` }}
            >
              {item}
            </li>
          ))}
          {placeholdersCount > 0 &&
            Array.from(Array(placeholdersCount).keys()).map(key => (
              <li key={key} className={styles['listItem']} style={{ marginRight: `${itemsMargin}px` }}>
                {placeholderElement}
              </li>
            ))}
        </ul>
      </div>
      <div className={styles['buttonContainer']}>
        {customButtonRight ? (
          <span onClick={handleGoForward} className={`navButton ${styles['emptyButton']}`}>
            {customButtonRight}
          </span>
        ) : (
          <button
            id="button-right"
            aria-label="Forward"
            onClick={handleGoForward}
            className={`navButton ${styles['emptyButton']} ${styles['button']}`}
            style={buttonsStyle}
          >
            <ArrowIcon />
          </button>
        )}
      </div>
    </div>
  );

  function handleGoForward() {
    scroll.forward();
    shifter.forward(itemsPerDisplay);
  }

  function handleGoBack() {
    shifter.back(itemsPerDisplay);
    scroll.back();
  }
};

export const InfiniteSlide = React.memo(InfiniteSlider);
