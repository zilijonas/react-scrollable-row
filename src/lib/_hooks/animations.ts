import { DEFAULT_TIME } from '../constants';

export function slideTo(
  listEl: HTMLDivElement | null,
  params: { shift: number; time?: number; callback?: VoidFunction },
) {
  if (!listEl) return;

  updateListAnimationTime(listEl, params.time ?? DEFAULT_TIME);
  params?.callback?.();
  updateListPosition(listEl, params.shift);
}

const updateListPosition = (el: HTMLDivElement | null, position: number) =>
  !Number.isNaN(position) && el?.style.setProperty('left', `${-position}px`);

const updateListAnimationTime = (el: HTMLDivElement | null, time: number) =>
  el?.style.setProperty('transition', `left ${time}ms ease-in-out`);
