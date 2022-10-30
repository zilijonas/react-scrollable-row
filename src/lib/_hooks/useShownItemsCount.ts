import { useState } from 'react';
import { ItemsPerScrollWidthConfig } from '../types';
import { useListener } from './useListener';

export const useShownItemsCount = (config: ItemsPerScrollWidthConfig, list: HTMLDivElement | null) => {
  const [count, setCount] = useState<number>(0);

  useListener(
    {
      type: 'resize',
      fn: () => setCount(countMax(list!.clientWidth, config)),
      disabled: !list,
      runOnInit: true,
    },
    [list, resolutions, config],
  );

  return { count };
};

const countMax = (width: number, config: ItemsPerScrollWidthConfig) =>
  width ? config[resolutions(config).find(r => width <= r) ?? 'max'] : 0;

const resolutions = (config: ItemsPerScrollWidthConfig) =>
  Object.keys(config)
    .filter(Number)
    .map(Number)
    .sort((a, b) => a - b);
