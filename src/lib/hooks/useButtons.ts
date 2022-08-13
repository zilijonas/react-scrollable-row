import { useLayoutEffect } from 'react';
import { ContainerElement, ScrollableElement } from '../elements';
import { useListener } from './useListener';

interface Props {
  noButtons: boolean;
  list: ScrollableElement | null;
  container: ContainerElement | null;
  fitCount: number;
}

export const useButtons = ({ list, container, fitCount, noButtons }: Props) => {
  const toggleButtons =
    container &&
    list &&
    (() =>
      container.toggleButtons(
        list.items.length <= fitCount,
        list.scrollPosition <= 0,
        list.scrollPosition >= list.scrollWidth - list.stepSize,
      ));
  useListener(
    ['transitionstart', 'transitionend'],
    !noButtons && toggleButtons,
    [noButtons, container, fitCount, list],
    list?.innerList,
  );
  useListener(['scroll', 'resize'], !noButtons && toggleButtons, [noButtons, container, fitCount, list]);
  useLayoutEffect(() => {
    list && container && noButtons && container?.hideButtons();
  }, [noButtons, container, list]);
};
