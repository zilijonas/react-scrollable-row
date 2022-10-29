import { useReducer } from 'react';
import { delayAnimation, slideTo } from './animations';
import { Order } from './Order';
import { countListItems } from './utilts';

type State = { shift: number };
type Action = 'forward' | 'back' | 'reset';
export type ScrollType = 'infinite' | 'finite';

const DEFAULT_STATE: State = { shift: 0 };

export const useScrollReducer = (
  itemsPerDisplay: number,
  listEl: HTMLDivElement | null,
  order: Order,
  type: ScrollType,
) => useReducer(reducer(itemsPerDisplay, listEl, order, type), DEFAULT_STATE);

const reducer =
  (itemsPerDisplay: number, listEl: HTMLDivElement | null, order: Order, type: ScrollType) =>
  (state: State, action: Action) => {
    const itemsCount = countListItems(listEl);
    const stepSize = listEl?.clientWidth ?? 0;
    const emptySpacedStepSize = (stepSize / itemsPerDisplay) * (itemsCount % itemsPerDisplay);
    const listWidth = listEl?.scrollWidth ?? 0;
    const startReached = state.shift >= 0;
    const startWillBeReached = state.shift + stepSize >= 0;
    const endReached = state.shift - stepSize <= -listWidth;
    const endWillBeReached = state.shift - stepSize - emptySpacedStepSize < -listWidth;

    switch (action) {
      case 'forward': {
        if (type === 'finite' && endReached) {
          return state;
        }

        if (type === 'finite' && endWillBeReached) {
          const lastStepSize = emptySpacedStepSize;
          const nextShift = state.shift - lastStepSize;
          slideTo(listEl, { shift: nextShift });
          return { ...state, shift: nextShift };
        }

        if (type === 'infinite' && endWillBeReached) {
          const nextShift = state.shift - emptySpacedStepSize;
          slideTo(listEl, { shift: nextShift });

          delayAnimation(() => {
            slideTo(listEl, { shift: 0, time: 0, callback: () => order.reorder() });
            delayAnimation(() => slideTo(listEl));
          });

          return { ...state, shift: 0 };
        }

        const nextShift = state.shift - stepSize;
        slideTo(listEl, { shift: nextShift });

        return { ...state, shift: state.shift - stepSize };
      }
      case 'back': {
        if (type === 'finite' && startReached) {
          return state;
        }

        if (type === 'finite' && startWillBeReached) {
          const nextShift = 0;
          slideTo(listEl, { shift: nextShift });
          return { ...state, shift: nextShift };
        }

        if (type === 'infinite' && startReached) {
          slideTo(listEl, { shift: -stepSize, time: 0, callback: () => order.reorder() });
          delayAnimation(() => slideTo(listEl, { shift: 0 }), 0);

          return { ...state, shift: 0 };
        }

        const nextShift = state.shift + stepSize;
        slideTo(listEl, { shift: nextShift });

        return { ...state, shift: nextShift };
      }
      default:
        throw new Error();
    }
  };
