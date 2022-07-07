import { ContainerElement, ScrollableElement } from '../elements';
import { useListener } from './useListener';

export type ItemsPerScrollWidthConfig = { [pixels: number]: number } & { max: number };

interface Props {
  listEl: ScrollableElement | null;
  containerEl: ContainerElement | null;
  margin: number;
  fitCount: number;
}

export const useUpdateItemsSize = ({ containerEl, listEl, margin, fitCount }: Props) =>
  useListener('resize', listEl && containerEl && (() => listEl.updateItemsSize(containerEl.width, fitCount, margin)), [
    containerEl,
    fitCount,
    listEl,
    margin,
  ]);
