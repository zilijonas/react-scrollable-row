import { useCallback, useMemo, useState } from 'react';
import { useToggleButtons } from './useToggleButtons';
import { useItemsLoop } from './useItemsLoop';
import { useFittedItemsCount } from './useFittedItemsCount';
import { useResetScroll } from './useResetScroll';
import { useUpdateItemsSize } from './useUpdateItemsSize';
import { ItemsPerResolutionConfig } from '../types';
import { ContainerElement, ScrollableElement } from '../elements';

interface Props {
  looped: boolean;
  itemsPerResolutionConfig: ItemsPerResolutionConfig;
  marginBetweenItems: number;
}

export const useSlideable = ({ itemsPerResolutionConfig, looped, marginBetweenItems }: Props) => {
  const [containerEl, setContainerEl] = useState<ContainerElement | null>(null);
  const [listEl, setListEl] = useState<ScrollableElement | null>(null);
  const { fittedItemsCount } = useFittedItemsCount({ containerEl, itemsPerResolutionConfig });

  useItemsLoop({ listEl, looped });
  useResetScroll({ containerEl, listEl });
  useUpdateItemsSize({ containerEl, listEl, marginBetweenItems, fittedItemsCount });
  useToggleButtons({ containerEl, listEl, fittedItemsCount });

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
