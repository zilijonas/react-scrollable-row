import { useReducer } from 'react';
import { SlideType } from '../types';
import { AnimatedList } from '../ui/AnimatedList';

type State = { shift: number };
type Action = 'forward' | 'back';

const DEFAULT_STATE: State = { shift: 0 };

export const useScrollReducer = (animatedList: AnimatedList | null, type: SlideType) =>
  useReducer(reducer(animatedList, type), DEFAULT_STATE);

const reducer = (animatedList: AnimatedList | null, type: SlideType) => (state: State, action: Action) => {
  if (!animatedList) {
    return state;
  }

  switch (action) {
    case 'forward': {
      animatedList.enableBack();
      const endReached = state.shift + animatedList.stepSize >= animatedList.listWidth;
      const endWillBeReached =
        state.shift + animatedList.stepSize + animatedList.remainderStepSize >= animatedList.listWidth;

      if (type === 'finite' && endReached) {
        animatedList.disableForward();
        return state;
      }

      if (type === 'finite' && endWillBeReached) {
        const nextShift = state.shift + animatedList.remainderStepSize;
        animatedList.slide(nextShift);
        animatedList.disableForward();
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
      animatedList.enableForward();
      const startReached = state.shift <= 0;
      const startWillBeReached = state.shift - animatedList.stepSize <= 0;

      if (type === 'finite' && startReached) {
        return state;
      }

      if (type === 'finite' && startWillBeReached) {
        const nextShift = 0;
        animatedList.slide(nextShift);
        animatedList.disableBack();
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
