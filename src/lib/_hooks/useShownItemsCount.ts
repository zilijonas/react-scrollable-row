import { useState } from 'react';
import { ItemsPerScrollWidthConfig } from '../types';
import { useListener } from './useListener';

export const useShownItemsCount = (config: ItemsPerScrollWidthConfig, width: number) => {
  const [count, setCount] = useState<number>(countMax(width, config));
  useListener({ type: 'resize', fn: () => setCount(countMax(width, config)) }, [width, resolutions, config]);

  return { count };
};

const countMax = (width: number, config: ItemsPerScrollWidthConfig) =>
  width ? config[resolutions(config).find(r => width <= r) ?? 'max'] : 0;

const resolutions = (config: ItemsPerScrollWidthConfig) =>
  Object.keys(config)
    .filter(Number)
    .map(Number)
    .sort((a, b) => a - b);
