import { useEffect, useMemo, useReducer } from 'react';

const DEFAULT_TIME = 600;

type State = { status: 'startReached' | 'scrolled' | 'endReached'; positionsShifted: number };
type Action = 'forward' | 'back';

const initialState: State = { status: 'startReached', positionsShifted: 0 };

const reducer = (itemsPerDisplay: number, itemsCount: number) => (state: State, action: Action) => {
  switch (action) {
    case 'forward': {
      if (state.status === 'endReached') return state;
      const endWillBeReached = state.positionsShifted + itemsPerDisplay * 2 > itemsCount;
      const nextShift = endWillBeReached ? itemsCount - state.positionsShifted - itemsPerDisplay : itemsPerDisplay;
      return {
        status: endWillBeReached ? 'endReached' : 'scrolled',
        positionsShifted: state.positionsShifted + nextShift,
      };
    }
    case 'back': {
      if (state.status === 'startReached') return state;
      const startWillBeReached = state.positionsShifted - itemsPerDisplay < 0;
      return {
        status: startWillBeReached ? 'startReached' : 'scrolled',
        positionsShifted: startWillBeReached ? 0 : state.positionsShifted - itemsPerDisplay,
      };
    }
    default:
      throw new Error();
  }
};

export const useScroll = (listEl: HTMLDivElement | null, itemsPerDisplay: number, stepSize: number) => {
  const itemWidth = stepSize / itemsPerDisplay;
  const items = useMemo(() => (listEl && Array.from(ulElement(listEl).children)) || [], [listEl]);
  const [state, dispatch] = useReducer(reducer(itemsPerDisplay, items.length), initialState);

  useEffect(() => items.forEach(updateListAnimationTime(DEFAULT_TIME)), [items]);

  useEffect(
    () => items.forEach(updateItemsPosition(itemWidth, -state.positionsShifted * itemWidth)),
    [items, itemWidth, state],
  );

  return { forward: () => dispatch('forward'), back: () => dispatch('back') };
};

const updateItemsPosition = (itemSpace: number, translateX: number) => (el: HTMLLIElement) => {
  el.style.setProperty('left', `${+el.id * itemSpace + translateX}px`);
};

const updateListAnimationTime = (time: number) => (el: HTMLUListElement) =>
  el.style.setProperty('transition', `left ${time}ms ease-in-out`);

const ulElement = (el: HTMLDivElement) => el.getElementsByTagName('ul')[0] as HTMLUListElement;
