let timeouts: NodeJS.Timeout[] = [];
let isThrottled = false;

export const delayTillNextFrame = (cb: VoidFunction) => delay(cb, 0);

export const delay = (cb: VoidFunction, time: number) => {
  const timeout = setTimeout(cb, time);
  timeouts.push(timeout);
};

export const throttle = (cb: VoidFunction, time: number) => {
  if (isThrottled) return;

  isThrottled = true;
  const timeout = setTimeout(() => (isThrottled = false), time);
  timeouts.push(timeout);
  cb();
};

export const resetAsyncTimeouts = () => timeouts.forEach(clearTimeout);
