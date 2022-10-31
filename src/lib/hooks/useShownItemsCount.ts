import { useState } from 'react';
import { DisplayConfig } from '../types';
import { useListener } from './useListener';

export const useShownItemsCount = (config: DisplayConfig, list: HTMLDivElement | null) => {
  const [count, setCount] = useState<number>(typeof config === 'number' ? config : 0);

  useListener(
    {
      type: 'resize',
      fn: () => setCount(countMax(list!.clientWidth, config)),
      disabled: !list || typeof config === 'number',
      runOnInit: true,
    },
    [list, resolutions, config],
  );

  return { count };
};

const countMax = (width: number, config: DisplayConfig) =>
  width ? config[resolutions(config).find(r => width <= r) ?? 'max'] : 0;

const resolutions = (config: DisplayConfig) =>
  Object.keys(config)
    .filter(Number)
    .map(Number)
    .sort((a, b) => a - b);
