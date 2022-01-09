import { useCallback, useMemo, useState } from 'react';
import { ContainerElement, ScrollableElement } from '../elements';
import { ItemsPerScrollWidthConfig } from '../types';
import { useFittedItemsCount } from './useFittedItemsCount';
import { useItemsLoop } from './useItemsLoop';
import { useResetScroll } from './useResetScroll';
import { useSwipeScroll } from './useSwipeScroll';
import { useToggleButtons } from './useToggleButtons';
import { useUpdateItemsSize } from './useUpdateItemsSize';

interface Props {
  swipeable: boolean;
  looped: boolean;
  noButtons: boolean;
  itemsPerScrollWidth: ItemsPerScrollWidthConfig;
  marginBetweenItems: number;
}

export const useSlideable = ({ itemsPerScrollWidth, looped, marginBetweenItems, swipeable, noButtons }: Props) => {
  const [containerEl, setContainerEl] = useState<ContainerElement | null>(null);
  const [listEl, setListEl] = useState<ScrollableElement | null>(null);
  const { fittedItemsCount } = useFittedItemsCount({ containerEl, itemsPerScrollWidth });

  useResetScroll({ containerEl, listEl });
  useItemsLoop({ listEl, looped, fittedItemsCount });
  useUpdateItemsSize({ containerEl, listEl, marginBetweenItems, fittedItemsCount });
  useToggleButtons({ containerEl, listEl, fittedItemsCount, noButtons });
  useSwipeScroll({ listEl, marginBetweenItems, fittedItemsCount, swipeable });

  const registerListRef = useCallback((ref: HTMLDivElement) => setListEl(new ScrollableElement(ref)), []);
  const registerContainerRef = useCallback((ref: HTMLDivElement) => setContainerEl(new ContainerElement(ref)), []);
  const handleScrollBack = useCallback(() => listEl?.scrollBack(marginBetweenItems), [marginBetweenItems, listEl]);
  const handleScrollForward = useCallback(
    () => listEl?.scrollForward(marginBetweenItems, fittedItemsCount),
    [marginBetweenItems, fittedItemsCount, listEl],
  );

  return useMemo(
    () => ({
      registerListRef,
      registerContainerRef,
      fittedItemsCount,
      scrollBack: handleScrollBack,
      scrollForward: handleScrollForward,
    }),
    [registerListRef, registerContainerRef, handleScrollForward, handleScrollBack, fittedItemsCount],
  );
};
