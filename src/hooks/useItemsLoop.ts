import { useLayoutEffect } from 'react';

type HTMLListElement = HTMLUListElement & { current: string };

interface Props {
  listEl: HTMLDivElement | null;
  looped: boolean;
  getStepSize(): number;
}

export const useItemsLoop = ({ listEl, looped, getStepSize }: Props) => {
  useLayoutEffect(() => {
    if (!listEl) return;

    function createElementsForLoop(this: HTMLDivElement) {
      const maxScroll = this.scrollWidth - this.clientWidth;
      const currentScroll = this.scrollLeft;
      if (currentScroll + getStepSize() >= maxScroll && listEl) {
        const list = listEl.getElementsByTagName('ul')[0] as HTMLListElement;
        const current = parseInt(list.dataset.current!, 10);
        const item = listEl.getElementsByTagName('li')[current];
        const newItem = item.cloneNode(true);
        list.appendChild(newItem);
        list.dataset.current = (current + 1).toString();
      }
    }

    looped && listEl?.addEventListener('scroll', createElementsForLoop);

    return () => {
      looped && listEl?.removeEventListener('scroll', createElementsForLoop);
    };
  }, [listEl, looped, getStepSize]);
};
