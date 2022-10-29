import { useReducer } from 'react';
import { slideTo } from './animations';
import { delay, delayTillNextFrame } from './async-utils';
import { countListItems } from './DOM-utils';
import { Order } from './Order';

type State = { shift: number };
type Action = 'forward' | 'back' | 'reset';
export type ScrollType = 'infinite' | 'finite';

const DEFAULT_STATE: State = { shift: 0 };

export const useScrollReducer = (
  shownItemsCount: number,
  listEl: HTMLDivElement | null,
  order: Order,
  type: ScrollType,
) => useReducer(reducer(shownItemsCount, listEl, order, type), DEFAULT_STATE);

const reducer =
  (shownItemsCount: number, listEl: HTMLDivElement | null, order: Order, type: ScrollType) =>
  (state: State, action: Action) => {
    const itemsCount = countListItems(listEl);
    const listWidth = listEl?.scrollWidth ?? 0;
    const stepSize = listEl?.clientWidth ?? 0;
    const emptySpacedStepSize = (stepSize / shownItemsCount) * (itemsCount % shownItemsCount);

    switch (action) {
      case 'forward': {
        const endReached = state.shift - stepSize <= -listWidth;
        const endWillBeReached = state.shift - stepSize - emptySpacedStepSize < -listWidth;

        if (type === 'finite' && endReached) {
          return state;
        }

        if (type === 'finite' && endWillBeReached) {
          const nextShift = state.shift - emptySpacedStepSize;
          slideTo(listEl, { shift: nextShift });
          return { ...state, shift: nextShift };
        }

        if (type === 'infinite' && endWillBeReached) {
          const nextShift = state.shift - emptySpacedStepSize;
          slideTo(listEl, { shift: nextShift });
          delay(() => {
            slideTo(listEl, { shift: 0, time: 0, callback: () => order.reorder() });
            delay(() => slideTo(listEl));
          });
          return { ...state, shift: 0 };
        }

        const nextShift = state.shift - stepSize;
        slideTo(listEl, { shift: nextShift });
        return { ...state, shift: state.shift - stepSize };
      }
      case 'back': {
        const startReached = state.shift >= 0;
        const startWillBeReached = state.shift + stepSize >= 0;

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
          delayTillNextFrame(() => slideTo(listEl, { shift: 0 }));
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
