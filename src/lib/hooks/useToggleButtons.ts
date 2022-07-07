import { useLayoutEffect } from 'react';
import { ContainerElement, ScrollableElement } from '../elements';
import { useListener } from './useListener';

interface Props {
  noButtons: boolean;
  listEl: ScrollableElement | null;
  containerEl: ContainerElement | null;
  fitCount: number;
}

export const useToggleButtons = ({ listEl, containerEl, fitCount, noButtons }: Props) => {
  const showButtons =
    containerEl &&
    listEl &&
    (() =>
      containerEl.showButtons(
        listEl.items.length <= fitCount,
        listEl.scrollPosition <= 0,
        listEl.scrollPosition >= listEl.scrollWidth - listEl.stepSize,
      ));
  useListener(
    ['resize', 'scroll'],
    !noButtons && showButtons,
    [noButtons, containerEl, fitCount, listEl],
    listEl?.element,
  );
  useListener('scroll', !noButtons && showButtons, [noButtons, containerEl, fitCount, listEl]);
  useLayoutEffect(() => {
    listEl && containerEl && noButtons && containerEl?.hideButtons();
  }, [noButtons, containerEl, listEl]);
};
