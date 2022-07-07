import { useCallback, useMemo, useState } from 'react';
import { ContainerElement, ScrollableElement } from '../elements';
import { ItemsPerScrollWidthConfig } from '../types';
import { useFitCount } from './useFittedItemsCount';
import { useItemsLoop } from './useItemsLoop';
import { useResetScroll } from './useResetScroll';
import { useSwipeScroll } from './useSwipeScroll';
import { useToggleButtons } from './useToggleButtons';
import { useUpdateItemsSize } from './useUpdateItemsSize';

interface Props {
  swipeable: boolean;
  looped: boolean;
  noButtons: boolean;
  config: ItemsPerScrollWidthConfig;
  itemsMargin: number;
}

export const useSlideable = ({ config, looped, itemsMargin: margin, swipeable, noButtons }: Props) => {
  const [containerEl, setContainerEl] = useState<ContainerElement | null>(null);
  const [listEl, setListEl] = useState<ScrollableElement | null>(null);
  const { fitCount } = useFitCount({ el: containerEl, config });

  useResetScroll({ containerEl, listEl });
  useItemsLoop({ listEl, looped, fitCount });
  useUpdateItemsSize({ containerEl, listEl, margin, fitCount });
  useToggleButtons({ containerEl, listEl, fitCount, noButtons });
  useSwipeScroll({ listEl, margin, fitCount, swipeable });

  const registerListRef = useCallback((ref: HTMLDivElement) => setListEl(new ScrollableElement(ref)), []);
  const registerContainerRef = useCallback((ref: HTMLDivElement) => setContainerEl(new ContainerElement(ref)), []);
  const handleScrollBack = useCallback(() => listEl?.scrollBack(margin), [margin, listEl]);
  const handleScrollForward = useCallback(() => listEl?.scrollForward(margin, fitCount), [margin, fitCount, listEl]);

  return useMemo(
    () => ({
      fittedItemsCount: fitCount,
      registerListRef,
      registerContainerRef,
      scrollBack: handleScrollBack,
      scrollForward: handleScrollForward,
    }),
    [registerListRef, registerContainerRef, handleScrollForward, handleScrollBack, fitCount],
  );
};
