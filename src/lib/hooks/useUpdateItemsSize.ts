import { useLayoutEffect } from 'react';
import { ContainerElement, ScrollableElement } from '../elements';

export type ItemsPerScrollWidthConfig = { [pixels: number]: number } & { max: number };

interface Props {
  listEl: ScrollableElement | null;
  containerEl: ContainerElement | null;
  marginBetweenItems: number;
  fittedItemsCount: number;
}

export const useUpdateItemsSize = ({ containerEl, listEl, marginBetweenItems, fittedItemsCount }: Props) => {
  useLayoutEffect(() => {
    if (!listEl || !containerEl) return;

    const updateItemsSize = () => listEl.updateItemsSize(containerEl.width, fittedItemsCount, marginBetweenItems);

    updateItemsSize();
    window.addEventListener('resize', updateItemsSize);

    return () => {
      window.removeEventListener('resize', updateItemsSize);
    };
  }, [containerEl, fittedItemsCount, listEl, marginBetweenItems]);
};
