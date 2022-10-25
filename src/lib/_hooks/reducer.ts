import { useReducer } from 'react';
import { animate, delayAnimation } from './animations';

type State = { shift: number; order: number[] };
type Action = 'forward' | 'back' | 'reset';
export type ListType = 'infinite' | 'finite';

const DEFAULT_STATE: State = { shift: 0, order: [] };

export const useScrollReducer = (itemsPerDisplay: number, listEl: HTMLDivElement | null, type: ListType = 'finite') =>
  useReducer(reducer(itemsPerDisplay, listEl, type), DEFAULT_STATE);

const reducer =
  (itemsPerDisplay: number, listEl: HTMLDivElement | null, type: ListType = 'finite') =>
  (state: State, action: Action) => {
    const items = Array.from(listEl?.getElementsByTagName('ul')[0].children ?? []);
    const order = state.order.length ? state.order : items.map(el => +el.id);
    const itemsOverflow = items.length % itemsPerDisplay;
    const itemsDeficiency = itemsPerDisplay - itemsOverflow;
    const stepSize = listEl?.clientWidth ?? 0;
    const listWidth = listEl?.scrollWidth ?? 0;
    const startReached = state.shift >= 0;
    const startWillBeReached = state.shift + stepSize >= 0;
    const endReached = state.shift - stepSize <= -listWidth;
    const endWillBeReached = state.shift - stepSize - (stepSize / itemsPerDisplay) * itemsOverflow < -listWidth;

    switch (action) {
      case 'forward': {
        if (type === 'finite' && endReached) return state;

        if (type === 'finite' && endWillBeReached) {
          const nextShift = state.shift - (stepSize / itemsPerDisplay) * (itemsPerDisplay - itemsDeficiency);
          animate(listEl, { shift: nextShift });
          return { ...state, shift: nextShift };
        }

        if (endWillBeReached) {
          const nextShift = state.shift - (stepSize / itemsPerDisplay) * itemsOverflow;
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

        if (startReached) {
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
      return [...order.slice(itemsPerDisplay - items.length), ...order.slice(0, itemsPerDisplay - items.length)];
    }
  };
