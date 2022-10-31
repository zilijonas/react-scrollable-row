import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowIcon } from '../assets/ArrowIcon';
import styles from '../styles.module.css';
import { resetAsyncTimeouts } from './async';
import { DEFAULT_ITEMS_PER_RESOLUTION_CONFIG } from './constants';
import { useScroll } from './hooks/useScroll';
import { useShownItemsCount } from './hooks/useShownItemsCount';
import { useSwipe } from './hooks/useSwipe';
import { SlideableProps } from './types';
import { AnimatedButtons, AnimatedList } from './ui/AnimatedList';

const InfiniteSlider: React.FC<SlideableProps> = ({
  items,
  buttonsStyle,
  looped = false,
  noButtons = false,
  swipeable = false,
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
    const buttons = noButtons ? null : ([leftButtonRef.current, rightButtonRef.current] as AnimatedButtons);
    return new AnimatedList(list, buttons, shownItems.count, itemsMargin);
  }, [list, shownItems.count, itemsMargin, noButtons]);
  const scroll = useScroll(animatedList, looped ? 'infinite' : 'finite');
  const placeholdersCount = placeholderElement ? shownItems.count - items.length : 0;

  useSwipe(swipeable ? animatedList : null, scroll.forward, scroll.back);

  useEffect(() => () => resetAsyncTimeouts(), []);

  const calcHeight = height === 'auto' ? animatedList?.itemHeight : 'auto';

  return (
    <div
      className={styles['container']}
      style={{
        height: calcHeight,
        minHeight: calcHeight,
        width,
        maxWidth: width,
      }}
    >
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
            <li key={item.key} className={styles['listItem']} style={{ marginRight: `${itemsMargin}px` }}>
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
};

export const Slideable = React.memo(InfiniteSlider, (_prevProps, _nextProps) => true);
