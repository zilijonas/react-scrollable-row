import { useLayoutEffect } from 'react';
import { ContainerElement, ScrollableElement } from '../elements';

export type ItemsPerResolutionConfig = { [pixels: number]: number } & { max: number };

interface Props {
  listEl: ScrollableElement | null;
  containerEl: ContainerElement | null;
  pixelsBetweenItems: number;
  fittedItemsCount: number;
}

export const useUpdateItemsSize = ({ containerEl, listEl, pixelsBetweenItems, fittedItemsCount }: Props) => {
  useLayoutEffect(() => {
    if (!listEl || !containerEl) return;

    const updateItemsSize = () => listEl.updateItemsSize(containerEl.width, fittedItemsCount, pixelsBetweenItems);

    updateItemsSize();
    window.addEventListener('resize', updateItemsSize);

    return () => {
      window.removeEventListener('resize', updateItemsSize);
    };
  }, [containerEl, fittedItemsCount, listEl, pixelsBetweenItems]);
};
