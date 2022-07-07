import { useMemo, useState } from 'react';
import { ContainerElement } from '../elements';
import { ItemsPerScrollWidthConfig } from '../types';
import { useListener } from './useListener';

interface Props {
  el: ContainerElement | null;
  config: ItemsPerScrollWidthConfig;
}

export const useFitCount = ({ el, config }: Props) => {
  const resolutions = useMemo(
    () =>
      Object.keys(config)
        .filter(Number)
        .map(Number)
        .sort((a, b) => a - b),
    [config],
  );
  const [fitCount, setFitCount] = useState<number>(itemsAvailableToFitCount(resolutions, config, el));
  useListener('resize', () => setFitCount(itemsAvailableToFitCount(resolutions, config, el)), [
    resolutions,
    config,
    el,
  ]);

  return { fitCount };
};

const itemsAvailableToFitCount = (
  resolutions: number[],
  config: ItemsPerScrollWidthConfig,
  el: ContainerElement | null,
) => (el?.width ? config[resolutions.find(r => el.width <= r) ?? 'max'] : 0);
