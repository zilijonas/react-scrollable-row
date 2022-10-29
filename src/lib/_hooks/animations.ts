export const DEFAULT_TIME = 600;

export const resetAnimationTimeouts = () => timeouts.forEach(clearTimeout);

let timeouts: NodeJS.Timeout[] = [];
export const delayAnimation = (cb: VoidFunction, time: number = DEFAULT_TIME) => {
  const timeout = setTimeout(cb, time);
  timeouts.push(timeout);
};

let isThrottled = false;
export const throttle = (cb: VoidFunction) => {
  if (isThrottled) return;

  isThrottled = true;
  const timeout = setTimeout(() => (isThrottled = false), DEFAULT_TIME);
  timeouts.push(timeout);
  cb();
};

export function slideTo(
  listEl: HTMLDivElement | null,
  params?: { shift: number; time?: number; callback?: VoidFunction },
) {
  if (!listEl) return;

  updateListAnimationTime(listEl, params?.time ?? DEFAULT_TIME);
  params?.callback?.();
  updateListPosition(listEl, params?.shift);
}

const updateListPosition = (el: HTMLDivElement | null, position?: number) =>
  !Number.isNaN(position) && el?.style.setProperty('left', `${position}px`);

const updateListAnimationTime = (el: HTMLDivElement | null, time: number) =>
  el?.style.setProperty('transition', `left ${time}ms ease-in-out`);
