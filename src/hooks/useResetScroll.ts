import { useLayoutEffect } from 'react';
import { scrollTo } from './common';

interface Props {
  listEl: HTMLDivElement | null;
  containerEl: HTMLDivElement | null;
  updateScrollPosition(value: number): void;
  updateStepSize(value: number): void;
}

export const useResetScroll = ({ listEl, containerEl, updateStepSize, updateScrollPosition }: Props) => {
  useLayoutEffect(() => {
    if (!listEl || !containerEl) return;
    updateStepSize(containerEl.clientWidth ?? 0);

    const resetScroll = () => {
      updateScrollPosition(0);
      updateStepSize(containerEl.clientWidth ?? 0);
      scrollTo(listEl, 0);
    };

    window.addEventListener('resize', resetScroll);

    return () => {
      window.removeEventListener('resize', resetScroll);
    };
  }, [containerEl, listEl, updateScrollPosition, updateStepSize]);
};
