import { useReducer } from 'react';
import { AnimatedList } from './AnimatedList';

type State = { shift: number };
type Action = 'forward' | 'back' | 'reset';
export type ScrollType = 'infinite' | 'finite';

const DEFAULT_STATE: State = { shift: 0 };

export const useScrollReducer = (animatedList: AnimatedList | null, type: ScrollType) =>
  useReducer(reducer(animatedList, type), DEFAULT_STATE);

const reducer = (animatedList: AnimatedList | null, type: ScrollType) => (state: State, action: Action) => {
  if (!animatedList) {
    return state;
  }

  switch (action) {
    case 'forward': {
      const endReached = state.shift + animatedList.stepSize >= animatedList.listWidth;
      const endWillBeReached =
        state.shift + animatedList.stepSize + animatedList.remainderStepSize >= animatedList.listWidth;

      if (type === 'finite' && endReached) {
        return state;
      }

      if (type === 'finite' && endWillBeReached) {
        const nextShift = state.shift + animatedList.remainderStepSize;
        animatedList.slide(nextShift);
        return { ...state, shift: nextShift };
      }

      if (type === 'infinite' && endWillBeReached) {
        const nextShift = state.shift + animatedList.remainderStepSize;
        animatedList.slideAndSwapForward(nextShift);
        return { ...state, shift: 0 };
      }

      const nextShift = state.shift + animatedList.stepSize;
      animatedList.slide(nextShift);
      return { ...state, shift: nextShift };
    }
    case 'back': {
      const startReached = state.shift <= 0;
      const startWillBeReached = state.shift - animatedList.stepSize <= 0;

      if (type === 'finite' && startReached) {
        return state;
      }

      if (type === 'finite' && startWillBeReached) {
        const nextShift = 0;
        animatedList.slide(nextShift);
        return { ...state, shift: nextShift };
      }

      if (type === 'infinite' && startReached) {
        const nextShift = animatedList.stepSize;
        animatedList.slideAndSwapBack(nextShift);
        return { ...state, shift: 0 };
      }

      const nextShift = state.shift - animatedList.stepSize;
      animatedList.slide(nextShift);
      return { ...state, shift: nextShift };
    }
    default:
      throw new Error();
  }
};
