import { useCallback, useEffect, useState } from 'react';

const DEFAULT_TIME = 600;

export const useScroll = (listEl: HTMLDivElement | null, itemsPerDisplay: number, stepSize: number) => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    if (!listEl || !stepSize || !itemsPerDisplay) return;
    Array.from(ulElement(listEl).children).forEach(updateItemsPosition(stepSize / itemsPerDisplay));
    // setTimeout(() => Array.from(ulElement(listEl).children).forEach(updateItemsTranslation(position)), DEFAULT_TIME);
  }, [listEl, stepSize, itemsPerDisplay, position]);

  useEffect(() => {
    listEl && Array.from(ulElement(listEl).children).forEach(updateListAnimationTime(DEFAULT_TIME));
  }, [listEl]);

  return {
    forward: useCallback(() => setPosition(pos => pos - stepSize), [stepSize]),
    back: useCallback(() => setPosition(pos => pos + stepSize), [stepSize]),
  };
};

const updateItemsPosition = (itemSpace: number) => (el: HTMLLIElement, index: number) =>
  el.style.setProperty('left', `${index * itemSpace}px`);

// const updateItemsTranslation = (position: number) => (el: HTMLLIElement) =>
//   el.style.setProperty('transform', `translateX(${position}px)`);

const updateListAnimationTime = (time: number) => (el: HTMLUListElement) =>
  el.style.setProperty('transition', `left ${time}ms ease-in-out`);

const ulElement = (el: HTMLDivElement) => el.getElementsByTagName('ul')[0] as HTMLUListElement;

// const itemIndexById = (el: HTMLLIElement, index: number) =>
//   Array.from(el.parentNode?.children ?? []).findIndex(el => +el.id === index);
