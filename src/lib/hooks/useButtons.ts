import { useLayoutEffect } from 'react';
import { ContainerElement, ScrollableElement } from '../elements';
import { useListener } from './useListener';

interface Props {
  noButtons: boolean;
  looped: boolean;
  list: ScrollableElement | null;
  container: ContainerElement | null;
  fitCount: number;
}

export const useButtons = ({ list, looped, container, fitCount, noButtons }: Props) => {
  useListener(
    ['transitionstart', 'transitionend'],
    !noButtons &&
      container &&
      list &&
      (() =>
        container.toggleButtons(
          list.items.length <= fitCount,
          !looped && list.scrollPosition <= 0,
          !looped && list.scrollPosition >= list.scrollWidth - list.stepSize,
        )),
    [noButtons, container, fitCount, list, looped],
    list?.innerList,
  );
  useLayoutEffect(() => {
    list && container && noButtons && container?.hideButtons();
  }, [noButtons, container, list]);
};
