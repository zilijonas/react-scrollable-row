import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowIcon } from '../assets/ArrowIcon';
import styles from '../styles.module.css';
import { DEFAULT_ITEMS_PER_RESOLUTION_CONFIG } from './constants';
import { SlideableProps } from './types';
import { AnimatedButtons, AnimatedList } from './_hooks/AnimatedList';
import { resetAsyncTimeouts } from './_hooks/async-utils';
import { useScroll } from './_hooks/useScroll';
import { useShownItemsCount } from './_hooks/useShownItemsCount';
import { useSwipe } from './_hooks/useSwipe';

const InfiniteSlider: React.FC<SlideableProps> = ({
  items,
  buttonsStyle,
  looped = false,
  // noButtons = false,
  // swipeable = false, TODO: implement swipeable
  width = '100%',
  height = 'auto',
  customButtonLeft,
  customButtonRight,
  placeholderElement,
  itemsMargin = 0,
  config = DEFAULT_ITEMS_PER_RESOLUTION_CONFIG,
}) => {
  const [list, setList] = useState<HTMLDivElement | null>(null);
  const shownItems = useShownItemsCount(config, list);
  const leftButtonRef = useRef<HTMLDivElement>(null);
  const rightButtonRef = useRef<HTMLDivElement>(null);
  const animatedList = useMemo(() => {
    if (!list || !shownItems.count) return null;
    const buttons = [leftButtonRef.current, rightButtonRef.current].filter(Boolean) as AnimatedButtons;
    return new AnimatedList(list, buttons, shownItems.count, itemsMargin);
  }, [list, shownItems.count, itemsMargin]);
  const scroll = useScroll(animatedList, looped ? 'infinite' : 'finite');
  const placeholdersCount = placeholderElement ? shownItems.count - items.length : 0;

  useSwipe(animatedList, scroll.forward, scroll.back);

  useEffect(() => () => resetAsyncTimeouts(), []);

  return (
    <div className={styles['container']} style={{ height, minHeight: height, width, maxWidth: width }}>
      <div className={styles['buttonContainer']} ref={leftButtonRef}>
        {customButtonLeft ? (
          <span onClick={scroll.back} className={`navButton ${styles['emptyButton']}`} role="button">
            {customButtonLeft}
          </span>
        ) : (
          <button
            id="button-back"
            aria-label="Back"
            onClick={scroll.back}
            className={`navButton ${styles['emptyButton']} ${styles['button']}`}
            style={buttonsStyle}
          >
            <ArrowIcon />
          </button>
        )}
      </div>
      <div className={styles['scrollableContent']} ref={setList}>
        <ul className={styles['list']}>
          {items.map(item => (
            <li key={item.key} className={styles['listItem2']} style={{ marginRight: `${itemsMargin}px` }}>
              {item}
            </li>
          ))}
          {placeholdersCount > 0 &&
            Array.from(Array(placeholdersCount).keys()).map(key => (
              <li key={key} className={styles['listItem2']} style={{ marginRight: `${itemsMargin}px` }}>
                {placeholderElement}
              </li>
            ))}
        </ul>
      </div>
      <div className={styles['buttonContainer']} ref={rightButtonRef}>
        {customButtonRight ? (
          <span onClick={scroll.forward} className={`navButton ${styles['emptyButton']}`} role="button">
            {customButtonRight}
          </span>
        ) : (
          <button
            id="button-right"
            aria-label="Forward"
            onClick={scroll.forward}
            className={`navButton ${styles['emptyButton']} ${styles['button']}`}
            style={buttonsStyle}
          >
            <ArrowIcon />
          </button>
        )}
      </div>
    </div>
  );

  // function loopedItems(items: JSX.Element[]): JSX.Element[] {
  //   if (items.length < shownItems.count * 2) {
  //     return loopedItems([...items, ...items]);
  //   }
  //   return items;
  // }
};

export const InfiniteSlide = React.memo(InfiniteSlider, (_prevProps, _nextProps) => true);
