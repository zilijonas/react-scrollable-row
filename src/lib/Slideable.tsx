import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowIcon } from '../assets/ArrowIcon';
import styles from '../styles.module.css';
import { resetAsyncTimeouts } from './async';
import { DEFAULT_DISPLAY_CONFIG } from './constants';
import { useScroll } from './hooks/useScroll';
import { useShownItemsCount } from './hooks/useShownItemsCount';
import { useSwipe } from './hooks/useSwipe';
import { SlideableProps } from './types';
import { AnimatedButtons, AnimatedList } from './ui/AnimatedList';

const InfiniteSlider: React.FC<SlideableProps> = ({
  items,
  height,
  width = '100%',
  type = 'finite',
  buttonsStyle,
  noButtons = false,
  swipeable = false,
  customButtonLeft,
  customButtonRight,
  placeholder,
  itemsGap = 0,
  displayConfig = DEFAULT_DISPLAY_CONFIG,
  onSlide,
}) => {
  const [list, setList] = useState<HTMLDivElement | null>(null);
  const shownItems = useShownItemsCount(displayConfig, list);
  const leftButtonRef = useRef<HTMLDivElement>(null);
  const rightButtonRef = useRef<HTMLDivElement>(null);
  const animatedList = useMemo(() => {
    if (!list || !shownItems.count) return null;
    const buttons = noButtons ? null : ([leftButtonRef.current, rightButtonRef.current] as AnimatedButtons);
    return new AnimatedList(list, buttons, shownItems.count, itemsGap);
  }, [list, shownItems.count, itemsGap, noButtons]);
  const scroll = useScroll(animatedList, type);
  const placeholdersCount = placeholder ? shownItems.count - items.length : 0;

  useSwipe(swipeable ? animatedList : null, handleForward, handleBack);

  useEffect(() => () => resetAsyncTimeouts(), []);

  return (
    <div
      className={styles['container']}
      style={{
        width,
        maxWidth: width,
        height: height ?? animatedList?.itemHeight,
        minHeight: height ?? animatedList?.itemHeight,
      }}
    >
      <div className={styles['buttonContainer']} ref={leftButtonRef}>
        {customButtonLeft ? (
          <span onClick={handleBack} className={`navButton ${styles['emptyButton']}`} role="button">
            {customButtonLeft}
          </span>
        ) : (
          <button
            id="button-back"
            aria-label="Back"
            onClick={handleBack}
            className={`navButton ${styles['emptyButton']} ${styles['button']}`}
            style={buttonsStyle}
          >
            <ArrowIcon />
          </button>
        )}
      </div>
      <div className={styles['scrollableContent']} ref={setList}>
        <ul className={styles['list']}>
          {normalizeListLength(items, shownItems.count * 2).map((item, index) => (
            <li key={index} className={styles['listItem']} style={{ marginRight: `${itemsGap}px` }}>
              {item}
            </li>
          ))}
          {placeholdersCount > 0 &&
            Array.from(Array(placeholdersCount).keys()).map(key => (
              <li key={key} className={styles['listItem']} style={{ marginRight: `${itemsGap}px` }}>
                {placeholder}
              </li>
            ))}
        </ul>
      </div>
      <div className={styles['buttonContainer']} ref={rightButtonRef}>
        {customButtonRight ? (
          <span onClick={handleForward} className={`navButton ${styles['emptyButton']}`} role="button">
            {customButtonRight}
          </span>
        ) : (
          <button
            id="button-right"
            aria-label="Forward"
            onClick={handleForward}
            className={`navButton ${styles['emptyButton']} ${styles['button']}`}
            style={buttonsStyle}
          >
            <ArrowIcon />
          </button>
        )}
      </div>
    </div>
  );

  function handleForward() {
    scroll.forward();
    onSlide?.('forward');
  }

  function handleBack() {
    scroll.back();
    onSlide?.('back');
  }
};

export const Slideable = React.memo(InfiniteSlider, (_prevProps, _nextProps) => true);

function normalizeListLength<T>(list: T[], min: number): T[] {
  if (list.length < min) {
    return normalizeListLength([...list, ...list], min);
  }
  return list;
}
