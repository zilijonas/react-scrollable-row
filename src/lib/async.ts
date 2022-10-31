import { DEFAULT_TIME } from './constants';

let timeouts: NodeJS.Timeout[] = [];
let isThrottled = false;

export const delayTillNextFrame = (cb: VoidFunction) => delay(cb, 0);

export const delay = (cb: VoidFunction, time: number = DEFAULT_TIME) => {
  const timeout = setTimeout(cb, time);
  timeouts.push(timeout);
};

export const throttle = (cb: VoidFunction) => {
  if (isThrottled) return;

  isThrottled = true;
  const timeout = setTimeout(() => (isThrottled = false), DEFAULT_TIME);
  timeouts.push(timeout);
  cb();
};

export const resetAsyncTimeouts = () => timeouts.forEach(clearTimeout);
