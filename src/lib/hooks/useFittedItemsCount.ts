import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { ContainerElement } from '../elements';
import { ItemsPerResolutionConfig } from '../types';

interface Props {
  containerEl: ContainerElement | null;
  itemsPerResolutionConfig: ItemsPerResolutionConfig;
}

export const useFittedItemsCount = ({ containerEl, itemsPerResolutionConfig }: Props) => {
  const resolutions = useMemo(
    () =>
      Object.keys(itemsPerResolutionConfig)
        .filter(Number)
        .map(Number)
        .sort((a, b) => a - b),
    [itemsPerResolutionConfig],
  );

  const itemsAvailableToFitCount = useCallback(
    () => (containerEl?.width ? itemsPerResolutionConfig[resolutions.find(r => containerEl.width <= r) ?? 'max'] : 0),
    [itemsPerResolutionConfig, resolutions, containerEl],
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
