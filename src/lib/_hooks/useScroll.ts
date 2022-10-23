import { useMemo, useReducer } from 'react';

const DEFAULT_TIME = 600;

type State = { shift: number; order: number[] };
type Action = 'forward' | 'back';

const initialState: State = { shift: 0, order: [] };

const reducer =
  (itemsPerDisplay: number, items: Element[], listEl: HTMLDivElement | null, stepSize: number) =>
  (state: State, action: Action) => {
    const defaultOrder = items.map((_, index) => index + 1);
    const deficiency = items.length % itemsPerDisplay;
    const order = state.order.length ? state.order : defaultOrder;

    switch (action) {
      case 'forward': {
        const endWillBeReached =
          state.shift - stepSize - (stepSize / itemsPerDisplay) * deficiency < -(listEl?.scrollWidth ?? 0);

        if (endWillBeReached) {
          const nextShift = state.shift - (stepSize / itemsPerDisplay) * deficiency;
          updateListPosition(listEl, nextShift);

          const newOrder = [
            ...order.slice(-itemsPerDisplay * 2 + (itemsPerDisplay - deficiency)),
            ...order.slice(0, -itemsPerDisplay * 2 + (itemsPerDisplay - deficiency)),
          ];

          setTimeout(() => {
            items.forEach((el, index) => updateElementOrder(newOrder[index])(el as any));
            updateListAnimationTime(listEl, 0);
            updateListPosition(listEl, 0);
            setTimeout(() => updateListAnimationTime(listEl, DEFAULT_TIME), DEFAULT_TIME);
          }, DEFAULT_TIME);

          return { shift: 0, order: newOrder };
        }

        const nextShift = state.shift - stepSize;
        updateListPosition(listEl, nextShift);

        return { shift: nextShift, order };
      }
      case 'back': {
        const startWillBeReached = state.shift === 0;

        if (startWillBeReached) {
          const newOrder = [
            ...order.slice(-itemsPerDisplay * 2 + (itemsPerDisplay - deficiency)),
            ...order.slice(0, -itemsPerDisplay * 2 + (itemsPerDisplay - deficiency)),
          ];

          items.forEach((el, index) => updateElementOrder(newOrder[index])(el as any));
          updateListAnimationTime(listEl, 0);
          updateListPosition(listEl, -stepSize);

          setTimeout(() => {
            updateListAnimationTime(listEl, DEFAULT_TIME);
            updateListPosition(listEl, 0);
          }, 0);

          return {
            shift: 0,
            order: order.map(i =>
              i + itemsPerDisplay > items.length ? i + itemsPerDisplay - items.length : i + itemsPerDisplay,
            ),
          };
        }

        const nextShift = state.shift + stepSize;
        updateListPosition(listEl, nextShift);

        return { shift: nextShift, order };
      }
      default:
        throw new Error();
    }
  };

export const useScroll = (listEl: HTMLDivElement | null, itemsPerDisplay: number, stepSize: number) => {
  const items = useMemo(() => (listEl && Array.from(listEl.getElementsByTagName('ul')[0].children)) || [], [listEl]);
  const [_state, dispatch] = useReducer(reducer(itemsPerDisplay, items, listEl, stepSize), initialState);

  return {
    forward: () => dispatch('forward'),
    back: () => dispatch('back'),
  };
};

const updateListPosition = (el: HTMLDivElement | null, listPosition: number) =>
  el?.style.setProperty('left', `${listPosition}px`);

const updateListAnimationTime = (el: HTMLDivElement | null, time: number) =>
  el?.style.setProperty('transition', `left ${time}ms ease-in-out`);

const updateElementOrder = (order: number) => (el: HTMLLIElement) => el.style.setProperty('order', `${order}`);
