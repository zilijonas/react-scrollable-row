import { useCallback, useLayoutEffect, useMemo, useRef } from 'react';

type HTMLListElement = HTMLUListElement & { current: string };

export type ItemsPerResolutionConfig = { [pixels: number]: number } & { max: number };

export const useScrollableRow = (
  itemsPerResolution: ItemsPerResolutionConfig,
  loopedScroll: boolean = false,
  arrowsStyle: Partial<CSSStyleDeclaration> = {},
) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const scrollPosition = useRef<number>(0);
  const stepSize = useRef<number>(0);

  const wholeScrollWidth = () => listRef.current?.scrollWidth ?? 0;

  const resolutions = useMemo(
    () =>
      Object.keys(itemsPerResolution)
        .filter(Number)
        .map(Number)
        .sort((a, b) => a - b),
    [itemsPerResolution],
  );

  const itemsPerRow = useCallback(
    () => itemsPerResolution[resolutions.find(r => (containerRef.current?.clientWidth ?? 0) <= r) ?? 'max'],
    [itemsPerResolution, resolutions],
  );

  useLayoutEffect(() => {
    if (!containerRef.current || !listRef.current) return;

    const listEl = listRef.current;
    const containerEl = containerRef.current;
    stepSize.current = containerEl.clientWidth ?? 0;
    const items = Array.from(listEl.getElementsByTagName('li'));
    const itemWidth = () => (containerEl.clientWidth ?? 0) / itemsPerRow();

    const setItemsSize = () => {
      items.forEach(item => {
        const width = itemWidth();
        (item as any).style = { width, 'min-width': width };
      });
    };

    const toggleButtons = () => {
      const buttons = Array.from(containerEl.getElementsByTagName('button'));
      buttons.forEach((button, idx) => {
        const isLast = idx + 1 === buttons.length;
        const allItemsFit = items.length <= itemsPerRow();
        const scrollStartReached = scrollPosition.current <= 0;
        const scrollEndReached = scrollPosition.current >= listEl.scrollWidth - stepSize.current;
        const shouldHide = allItemsFit || isLast ? scrollEndReached : scrollStartReached;
        (button as any).style = { display: shouldHide ? 'none' : 'block', width: itemWidth() / 3, ...arrowsStyle };
      });
    };

    const resetScroll = () => {
      scrollPosition.current = 0;
      stepSize.current = containerEl.clientWidth ?? 0;
      listRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
    };

    function createElementsForLoop(this: HTMLDivElement) {
      const maxScroll = this.scrollWidth - this.clientWidth;
      const currentScroll = this.scrollLeft;
      if (currentScroll + stepSize.current >= maxScroll && listEl) {
        const list = listEl.getElementsByTagName('ul')[0] as HTMLListElement;
        const current = parseInt(list.dataset.current!, 10);
        const item = listEl.getElementsByTagName('li')[current];
        const newItem = item.cloneNode(true);
        list.appendChild(newItem);
        list.dataset.current = (current + 1).toString();
      }
    }

    setItemsSize();
    toggleButtons();
    window.addEventListener('resize', resetScroll);
    window.addEventListener('resize', setItemsSize);
    window.addEventListener('resize', toggleButtons);
    listEl?.addEventListener('scroll', toggleButtons);
    loopedScroll && listEl?.addEventListener('scroll', createElementsForLoop);

    return () => {
      window.addEventListener('resize', resetScroll);
      window.removeEventListener('resize', setItemsSize);
      window.addEventListener('resize', toggleButtons);
      listEl?.removeEventListener('scroll', toggleButtons);
      loopedScroll && listEl?.removeEventListener('scroll', createElementsForLoop);
    };
  }, [loopedScroll, itemsPerRow, arrowsStyle]);

  const handleScrollBack = useCallback(() => {
    if (scrollPosition.current < 0) return;
    const scrollEndReached = scrollPosition.current + stepSize.current >= wholeScrollWidth();
    const scrollTo = scrollEndReached
      ? wholeScrollWidth() - stepSize.current * 2
      : scrollPosition.current - stepSize.current;
    scrollPosition.current = scrollTo > 0 ? scrollTo : 0;
    listRef.current?.scrollTo({ left: scrollPosition.current, behavior: 'smooth' });
  }, []);

  const handleScrollForward = useCallback(() => {
    if (scrollPosition.current > wholeScrollWidth()) return;
    scrollPosition.current = scrollPosition.current > 0 ? scrollPosition.current + stepSize.current : stepSize.current;
    listRef.current?.scrollTo({ left: scrollPosition.current, behavior: 'smooth' });
  }, []);

  return useMemo(
    () => ({
      listRef,
      containerRef,
      scrollForward: handleScrollForward,
      scrollBack: handleScrollBack,
    }),
    [listRef, containerRef, handleScrollForward, handleScrollBack],
  );
};
