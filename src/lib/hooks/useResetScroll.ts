import { useLayoutEffect } from 'react';
import { ContainerElement, ScrollableElement } from '../elements';

interface Props {
  listEl: ScrollableElement | null;
  containerEl: ContainerElement | null;
}

export const useResetScroll = ({ listEl, containerEl }: Props) => {
  useLayoutEffect(() => {
    if (!listEl || !containerEl) return;

    const updateStepSize = () => listEl.updateStepSize(containerEl.width);

    updateStepSize();
    window.addEventListener('resize', updateStepSize);

    return () => {
      window.removeEventListener('resize', updateStepSize);
    };
  }, [containerEl, listEl]);
};
