import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { ContainerElement } from '../elements';
import { ItemsPerScrollWidthConfig } from '../types';

interface Props {
  containerEl: ContainerElement | null;
  itemsPerScrollWidth: ItemsPerScrollWidthConfig;
}

export const useFittedItemsCount = ({ containerEl, itemsPerScrollWidth }: Props) => {
  const resolutions = useMemo(
    () =>
      Object.keys(itemsPerScrollWidth)
        .filter(Number)
        .map(Number)
        .sort((a, b) => a - b),
    [itemsPerScrollWidth],
  );

  const itemsAvailableToFitCount = useCallback(
    () => (containerEl?.width ? itemsPerScrollWidth[resolutions.find(r => containerEl.width <= r) ?? 'max'] : 0),
    [itemsPerScrollWidth, resolutions, containerEl],
  );

  const [fittedItemsCount, setFittedItemsCount] = useState<number>(itemsAvailableToFitCount());

  useLayoutEffect(() => {
    const updateItemsPerResolution = () => {
      setFittedItemsCount(itemsAvailableToFitCount());
    };

    updateItemsPerResolution();
    window.addEventListener('resize', updateItemsPerResolution);

    return () => {
      window.removeEventListener('resize', updateItemsPerResolution);
    };
  }, [itemsAvailableToFitCount]);

  return { fittedItemsCount };
};
