import { useCallback, useMemo, useRef, useState } from 'react';
import { useToggleButtons } from './useToggleButtons';
import { useItemsLoop } from './useItemsLoop';
import { useItemsPerResolution } from './useItemsPerResolution';
import { useResetScroll } from './useResetScroll';
import { useUpdateItemsSize } from './useUpdateItemsSize';
import { ItemsPerResolutionConfig, scrollTo } from './common';

interface Props {
  looped: boolean;
  itemsPerResolutionConfig: ItemsPerResolutionConfig;
  pixelsBetweenItems: number;
}

export const useSlideable = ({ itemsPerResolutionConfig, looped, pixelsBetweenItems }: Props) => {
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  const [listRef, setListRef] = useState<HTMLDivElement | null>(null);
  const scrollPosition = useRef<number>(0);
  const stepSize = useRef<number>(0);

  const wholeScrollWidth = useCallback(() => listRef?.scrollWidth ?? 0, [listRef]);
  const getStepSize = useCallback(() => stepSize.current, []);
  const getScrollPosition = useCallback(() => scrollPosition.current, []);
  const updateStepSize = useCallback((value: number) => (stepSize.current = value), []);
  const updateScrollPosition = useCallback((value: number) => (scrollPosition.current = value), []);

  const { renderedFittedItemsCount } = useItemsPerResolution({
    containerEl: containerRef,
    itemsPerResolutionConfig,
  });

  useUpdateItemsSize({
    containerEl: containerRef,
    listEl: listRef,
    pixelsBetweenItems,
    renderedFittedItemsCount,
  });
  useToggleButtons({
    containerEl: containerRef,
    listEl: listRef,
    renderedFittedItemsCount,
    getStepSize,
    getScrollPosition,
  });
  useItemsLoop({ listEl: listRef, looped, getStepSize });
  useResetScroll({ containerEl: containerRef, listEl: listRef, updateStepSize, updateScrollPosition });

  const handleScrollBack = useCallback(() => {
    if (scrollPosition.current < 0) return;
    const scrollEndReached = scrollPosition.current + stepSize.current >= wholeScrollWidth();
    const newScrollPos =
      (scrollEndReached ? wholeScrollWidth() - stepSize.current * 2 : scrollPosition.current - stepSize.current) -
      pixelsBetweenItems;
    scrollPosition.current = newScrollPos > 0 ? newScrollPos : 0;
    scrollTo(listRef, scrollPosition.current);
  }, [pixelsBetweenItems, listRef, wholeScrollWidth]);

  const handleScrollForward = useCallback(() => {
    if (scrollPosition.current > wholeScrollWidth()) return;
    const endWillBeReached = scrollPosition.current + stepSize.current >= wholeScrollWidth();
    scrollPosition.current =
      (scrollPosition.current > 0 ? scrollPosition.current + stepSize.current : stepSize.current) +
      pixelsBetweenItems -
      (endWillBeReached ? pixelsBetweenItems / renderedFittedItemsCount : 0);
    scrollTo(listRef, scrollPosition.current);
  }, [pixelsBetweenItems, renderedFittedItemsCount, listRef, wholeScrollWidth]);

  return useMemo(
    () => ({
      listRef: setListRef,
      containerRef: setContainerRef,
      scrollForward: handleScrollForward,
      scrollBack: handleScrollBack,
      renderedFittedItemsCount,
    }),
    [setListRef, setContainerRef, handleScrollForward, handleScrollBack, renderedFittedItemsCount],
  );
};
