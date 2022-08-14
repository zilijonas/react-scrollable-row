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
  list: ScrollableElement | null;
  container: ContainerElement | null;
  config: ItemsPerScrollWidthConfig;
}

export const useSlideable = ({ list, container, config, looped, swipeable, noButtons }: Props) => {
  const { fitCount } = useFitCount({ container, config });

  useListener('resize', list && container && (() => list.updateStepSize(container.width)), [container, list]);
  useListener(
    'transitionend',
    list && looped && !!fitCount && (() => list.cloneElements(fitCount)),
    [list, looped, fitCount],
    list?.innerList,
  );
  useListener('resize', list && container && (() => list.updateItemsSize(container.width, fitCount)), [
    container,
    fitCount,
    list,
  ]);

  useButtons({ container, looped, list, fitCount, noButtons });
  useSwipe({ list, fitCount, swipeable });

  return useMemo(
    () => ({
      fittedItemsCount: fitCount,
      scrollBack: () => list?.scrollBack(looped),
      scrollForward: () => list?.scrollForward(looped),
    }),
    [fitCount, list, looped],
  );
};
