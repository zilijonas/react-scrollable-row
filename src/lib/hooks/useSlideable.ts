import { useMemo } from 'react';
import { ContainerElement, ScrollableElement } from '../elements';
import { ItemsPerScrollWidthConfig } from '../types';
import { useButtons } from './useButtons';
import { useFitCount } from './useFitCount';
import { useListener } from './useListener';
import { useSwipe } from './useSwipe';

interface Props {
  looped: boolean;
  swipeable: boolean;
  noButtons: boolean;
  itemsMargin: number;
  list: ScrollableElement | null;
  container: ContainerElement | null;
  config: ItemsPerScrollWidthConfig;
}

export const useSlideable = ({ list, container, config, looped, itemsMargin: margin, swipeable, noButtons }: Props) => {
  const { fitCount } = useFitCount({ container, config });

  useListener('resize', list && container && (() => list.updateStepSize(container.width)), [container, list]);
  useListener(
    'scroll',
    looped && list && (() => list.cloneElements(fitCount)),
    [list, looped, fitCount],
    list?.element,
  );
  useListener('resize', list && container && (() => list.updateItemsSize(container.width, fitCount, margin)), [
    container,
    fitCount,
    list,
    margin,
  ]);

  useButtons({ container, list, fitCount, noButtons });
  useSwipe({ list, margin, fitCount, swipeable });

  return useMemo(
    () => ({
      fittedItemsCount: fitCount,
      scrollBack: () => list?.scrollBack(margin),
      scrollForward: () => list?.scrollForward(margin, fitCount),
    }),
    [fitCount, list, margin],
  );
};
