import { useLayoutEffect } from 'react';
import { listItems } from './common';

interface Props {
  listEl: HTMLDivElement | null;
  containerEl: HTMLDivElement | null;
  getStepSize(): number;
  getScrollPosition(): number;
  fittedItemsCount: number;
}

export const useToggleButtons = ({ listEl, containerEl, getScrollPosition, getStepSize, fittedItemsCount }: Props) => {
  useLayoutEffect(() => {
    if (!containerEl || !listEl) return;

    const toggleButtons = () => {
      const buttons = Array.from(containerEl.getElementsByTagName('button'));
      buttons.forEach((button, idx) => {
        const isLast = idx + 1 === buttons.length;
        const allItemsFit = listItems(listEl).length <= fittedItemsCount;
        const scrollStartReached = getScrollPosition() <= 0;
        const scrollEndReached = getScrollPosition() >= listEl.scrollWidth - getStepSize();
        const shouldHide = allItemsFit || isLast ? scrollEndReached : scrollStartReached;
        button.style.display = shouldHide ? 'none' : 'block';
      });
    };

    toggleButtons();
    window.addEventListener('resize', toggleButtons);
    listEl?.addEventListener('scroll', toggleButtons);

    return () => {
      window.removeEventListener('resize', toggleButtons);
      listEl?.removeEventListener('scroll', toggleButtons);
    };
  }, [containerEl, fittedItemsCount, listEl, getScrollPosition, getStepSize]);
};
