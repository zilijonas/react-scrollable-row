import { useMemo, useState } from 'react';
import { ContainerElement } from '../elements';
import { ItemsPerScrollWidthConfig } from '../types';
import { useListener } from './useListener';

interface Props {
  container: ContainerElement | null;
  config: ItemsPerScrollWidthConfig;
}

export const useFitCount = ({ container, config }: Props) => {
  const resolutions = useMemo(
    () =>
      Object.keys(config)
        .filter(Number)
        .map(Number)
        .sort((a, b) => a - b),
    [config],
  );
  const [fitCount, setFitCount] = useState<number>(maxItemsCount(resolutions, config, container));

  useListener('resize', () => setFitCount(maxItemsCount(resolutions, config, container)), [
    resolutions,
    container,
    config,
  ]);

  return { fitCount };
};

const maxItemsCount = (resolutions: number[], config: ItemsPerScrollWidthConfig, el: ContainerElement | null) =>
  el?.width ? config[resolutions.find(r => el.width <= r) ?? 'max'] : 0;
