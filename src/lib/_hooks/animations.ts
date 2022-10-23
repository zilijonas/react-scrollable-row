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

export function animate(listEl: HTMLDivElement | null, params?: { shift: number; order?: number[]; time?: number }) {
  if (!listEl) return;

  updateListAnimationTime(listEl, params?.time ?? DEFAULT_TIME);
  updateElementsOrder(listEl, params?.order);
  updateListPosition(listEl, params?.shift);
}

const updateListPosition = (el: HTMLDivElement | null, position?: number) =>
  !Number.isNaN(position) && el?.style.setProperty('left', `${position}px`);

const updateListAnimationTime = (el: HTMLDivElement | null, time: number) =>
  el?.style.setProperty('transition', `left ${time}ms ease-in-out`);

const updateElementsOrder = (el: HTMLDivElement | null, order?: number[]) =>
  order?.forEach((position, index) =>
    (el?.getElementsByTagName('ul')[0].children.item(index) as HTMLDivElement | null)?.style.setProperty(
      'order',
      `${position}`,
    ),
  );
