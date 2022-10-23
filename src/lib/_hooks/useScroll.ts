import { useEffect, useReducer } from 'react';
import { animate, delayAnimation, resetAnimationTimeouts, throttle } from './animations';

type State = { shift: number; order: number[] };
type Action = 'forward' | 'back';

const initialState: State = { shift: 0, order: [] };

const reducer =
  (itemsPerDisplay: number, listEl: HTMLDivElement | null, stepSize: number) => (state: State, action: Action) => {
    const items = Array.from(listEl?.getElementsByTagName('ul')[0].children ?? []);
    const deficiency = items.length % itemsPerDisplay;
    const order = state.order.length ? state.order : items.map(el => +el.id);

    switch (action) {
      case 'forward': {
        const endWillBeReached =
          state.shift - stepSize - (stepSize / itemsPerDisplay) * deficiency < -(listEl?.scrollWidth ?? 0);

        if (endWillBeReached) {
          const nextShift = state.shift - (stepSize / itemsPerDisplay) * deficiency;
          animate(listEl, { shift: nextShift });

          const newOrder = reorderedItems();
          delayAnimation(() => {
            animate(listEl, { shift: 0, time: 0, order: newOrder });
            delayAnimation(() => animate(listEl));
          });

          return { shift: 0, order: newOrder };
        }

        const nextShift = state.shift - stepSize;
        animate(listEl, { shift: nextShift, order });

        return { shift: nextShift, order };
      }
      case 'back': {
        const startWillBeReached = state.shift === 0;

        if (startWillBeReached) {
          const newOrder = reorderedItems();
          animate(listEl, { shift: -stepSize, order: newOrder, time: 0 });
          delayAnimation(() => animate(listEl, { shift: 0 }), 0);

          return { shift: 0, order: newOrder };
        }

        const nextShift = state.shift + stepSize;
        animate(listEl, { shift: nextShift });

        return { shift: nextShift, order };
      }
      default:
        throw new Error();
    }

    function reorderedItems() {
      return [
        ...order.slice(-itemsPerDisplay * 2 + (itemsPerDisplay - deficiency)),
        ...order.slice(0, -itemsPerDisplay * 2 + (itemsPerDisplay - deficiency)),
      ];
    }
  };

export const useScroll = (listEl: HTMLDivElement | null, itemsPerDisplay: number, stepSize: number) => {
  const [, dispatch] = useReducer(reducer(itemsPerDisplay, listEl, stepSize), initialState);

  useEffect(() => () => resetAnimationTimeouts(), []);

  return {
    forward: () => throttle(() => dispatch('forward')),
    back: () => throttle(() => dispatch('back')),
  };
};
