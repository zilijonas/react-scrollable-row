import { useEffect, useReducer } from 'react';
import { animate, delayAnimation, resetAnimationTimeouts, throttle } from './animations';

type State = { shift: number; order: number[] };
type Action = 'forward' | 'back';
type ListType = 'infinite' | 'finite';

const initialState: State = { shift: 0, order: [] };

const reducer =
  (itemsPerDisplay: number, listEl: HTMLDivElement | null, type: ListType = 'finite') =>
  (state: State, action: Action) => {
    const stepSize = listEl?.clientWidth ?? 0;
    const listWidth = listEl?.scrollWidth ?? 0;
    const items = Array.from(listEl?.getElementsByTagName('ul')[0].children ?? []);
    const deficiency = items.length % itemsPerDisplay;
    const order = state.order.length ? state.order : items.map(el => +el.id);
    const startReached = state.shift >= 0;
    const startWillBeReached = state.shift + stepSize >= 0;
    const endReached = state.shift - stepSize < -listWidth;
    const endWillBeReached = state.shift - stepSize - (stepSize / itemsPerDisplay) * deficiency < -listWidth;

    switch (action) {
      case 'forward': {
        if (type === 'finite' && endReached) return state;

        if (type === 'finite' && endWillBeReached) {
          const nextShift = state.shift - (stepSize / itemsPerDisplay) * deficiency;
          animate(listEl, { shift: nextShift });
          return { ...state, shift: nextShift };
        }

        if (endWillBeReached) {
          const nextShift = state.shift - (stepSize / itemsPerDisplay) * deficiency;
          animate(listEl, { shift: nextShift });

          const newOrder = reorderedItems();
          delayAnimation(() => {
            animate(listEl, { shift: 0, time: 0, order: newOrder });
            delayAnimation(() => animate(listEl));
          });

          return { ...state, shift: 0, order: newOrder };
        }

        const nextShift = state.shift - stepSize;
        animate(listEl, { shift: nextShift, order });

        return { ...state, shift: state.shift - stepSize };
      }
      case 'back': {
        if (type === 'finite' && startReached) return state;

        if (type === 'finite' && startWillBeReached) {
          const nextShift = 0;
          animate(listEl, { shift: nextShift });
          return { ...state, shift: nextShift };
        }

        if (startWillBeReached) {
          const newOrder = reorderedItems();
          animate(listEl, { shift: -stepSize, order: newOrder, time: 0 });
          delayAnimation(() => animate(listEl, { shift: 0 }), 0);

          return { ...state, shift: 0, order: newOrder };
        }

        const nextShift = state.shift + stepSize;
        animate(listEl, { shift: nextShift });

        return { ...state, shift: nextShift, order };
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

export const useScroll = (listEl: HTMLDivElement | null, itemsPerDisplay: number, type: ListType) => {
  const [, dispatch] = useReducer(reducer(itemsPerDisplay, listEl, type), initialState);

  useEffect(() => () => resetAnimationTimeouts(), []);

  return {
    forward: () => throttle(() => dispatch('forward')),
    back: () => throttle(() => dispatch('back')),
  };
};
