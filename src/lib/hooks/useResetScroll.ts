import { ContainerElement, ScrollableElement } from '../elements';
import { useListener } from './useListener';

interface Props {
  listEl: ScrollableElement | null;
  containerEl: ContainerElement | null;
}

export const useResetScroll = ({ listEl, containerEl }: Props) =>
  useListener('resize', listEl && containerEl && (() => listEl.updateStepSize(containerEl.width)), [
    containerEl,
    listEl,
  ]);
