import { useMemo, useReducer } from 'react';

const DEFAULT_TIME = 600;

type State = { status: 'startReached' | 'scrolled' | 'endReached'; positionsShifted: number; order: number[] };
type Action = 'forward' | 'back';

const initialState: State = { status: 'startReached', positionsShifted: 0, order: [] };

const reducer =
  (itemsPerDisplay: number, items: Element[], listEl: HTMLDivElement | null, stepSize: number) =>
  (state: State, action: Action) => {
    const defaultOrder = items.map((_, index) => index + 1);
    const order = state.order.length ? state.order : defaultOrder;

    switch (action) {
      case 'forward': {
        if (state.status === 'endReached') return state;
        const endWillBeReached = state.positionsShifted + itemsPerDisplay * 2 > items.length;
        items.forEach((el, index) => updateElementOrder(order[index])(el as any));
        updateListPosition(listEl, state.positionsShifted + stepSize);

        return {
          status: endWillBeReached ? 'endReached' : 'scrolled',
          positionsShifted: state.positionsShifted + stepSize,
          order: order.map(i =>
            i + itemsPerDisplay > items.length ? i + itemsPerDisplay - items.length : i + itemsPerDisplay,
          ),
        };
      }
      case 'back': {
        const endWillBeReached = state.positionsShifted - stepSize * 2 < -(listEl?.scrollWidth ?? 0);

        if (endWillBeReached) {
          const nextShift = state.positionsShifted - (items.length % itemsPerDisplay) * (stepSize / itemsPerDisplay);
          updateListPosition(listEl, nextShift);

          const newOrder = [
            ...order.slice(-itemsPerDisplay * 2 + 1),
            ...order.slice(0, items.length - itemsPerDisplay * 2 + 1),
          ];

          setTimeout(() => {
            items.forEach((el, index) => updateElementOrder(newOrder[index])(el as any));
            updateListAnimationTime(0)(listEl);
            updateListPosition(listEl, 0);
            setTimeout(() => updateListAnimationTime(DEFAULT_TIME)(listEl), DEFAULT_TIME);
          }, DEFAULT_TIME);

          // updateListAnimationTime(DEFAULT_TIME)(listEl);

          return {
            status: endWillBeReached ? 'startReached' : 'scrolled',
            positionsShifted: 0,
            order: newOrder,
          };
        }

        const nextShift = state.positionsShifted - stepSize;
        // items.forEach((el, index) => updateElementOrder(order[index])(el as any));
        updateListPosition(listEl, nextShift);

        return {
          status: endWillBeReached ? 'scrolled' : 'scrolled',
          positionsShifted: nextShift,
          order,
        };
      }
      default:
        throw new Error();
    }
  };

export const useScroll = (listEl: HTMLDivElement | null, itemsPerDisplay: number, stepSize: number) => {
  // const itemWidth = stepSize / itemsPerDisplay;
  const items = useMemo(() => (listEl && Array.from(ulElement(listEl).children)) || [], [listEl]);
  const [_state, dispatch] = useReducer(reducer(itemsPerDisplay, items, listEl, stepSize), initialState);

  // useEffect(() => updateListAnimationTime(DEFAULT_TIME)(listEl), [listEl]);

  return {
    forward: () => dispatch('forward'),
    back: () => dispatch('back'),
  };
};

const updateListPosition = (el: HTMLDivElement | null, listPosition: number) => {
  el?.style.setProperty('position', `absolute`);
  el?.style.setProperty('left', `${listPosition}px`);
};

const updateListAnimationTime = (time: number) => (el: HTMLDivElement | null) =>
  el?.style.setProperty('transition', `left ${time}ms ease-in-out`);

const ulElement = (el: HTMLDivElement) => el.getElementsByTagName('ul')[0] as HTMLUListElement;

const updateElementOrder = (order: number) => (el: HTMLLIElement) => {
  // console.log(order);
  el.style.setProperty('order', `${order}`);
};
