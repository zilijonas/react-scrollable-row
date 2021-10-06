import { useLayoutEffect } from 'react';
import { listItems } from './common';

export type ItemsPerResolutionConfig = { [pixels: number]: number } & { max: number };

interface Props {
  listEl: HTMLDivElement | null;
  containerEl: HTMLDivElement | null;
  pixelsBetweenItems: number;
  fittedItemsCount: number;
}

export const useUpdateItemsSize = ({ containerEl, listEl, pixelsBetweenItems, fittedItemsCount }: Props) => {
  useLayoutEffect(() => {
    const updateItemsSize = () => setItemsSize(listEl, containerEl, fittedItemsCount, pixelsBetweenItems);

    updateItemsSize();
    window.addEventListener('resize', updateItemsSize);

    return () => {
      window.removeEventListener('resize', updateItemsSize);
    };
  }, [containerEl, fittedItemsCount, listEl, pixelsBetweenItems]);
};

const setItemsSize = (
  listEl: HTMLDivElement | null,
  containerEl: HTMLDivElement | null,
  fittedItemsCount: number,
  pixelsBetweenItems: number,
) => {
  const spaceWidth = (containerEl?.clientWidth ?? 0) / fittedItemsCount;
  const width = spaceWidth - pixelsBetweenItems + pixelsBetweenItems / fittedItemsCount;
  listItems(listEl).forEach(item => {
    (item as any).style = `${item.style.cssText ?? ''}; width: ${width}px; min-width: ${width}px;`;
  });
};
