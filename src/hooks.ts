import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';

type HTMLListElement = HTMLUListElement & { current: string };

export type ItemsPerResolutionConfig = { [pixels: number]: number } & { max: number };

interface Props {
  loopedScroll: boolean;
  itemsPerResolutionConfig: ItemsPerResolutionConfig;
  arrowsStyle: Partial<CSSStyleDeclaration>;
  pixelsBetweenItems: number;
}

export const useSlideable = ({ itemsPerResolutionConfig, loopedScroll, arrowsStyle, pixelsBetweenItems }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const scrollPosition = useRef<number>(0);
  const stepSize = useRef<number>(0);

  const wholeScrollWidth = () => listRef.current?.scrollWidth ?? 0;

  const resolutions = useMemo(
    () =>
      Object.keys(itemsPerResolutionConfig)
        .filter(Number)
        .map(Number)
        .sort((a, b) => a - b),
    [itemsPerResolutionConfig],
  );

  const itemsPerRow = useCallback(
    () =>
      containerRef.current?.clientWidth
        ? itemsPerResolutionConfig[resolutions.find(r => containerRef.current!.clientWidth <= r) ?? 'max']
        : 0,
    [itemsPerResolutionConfig, resolutions],
  );

  const [itemsPerResolution, setItemsPerResolution] = useState<number>(itemsPerRow());

  useLayoutEffect(() => {
    if (!itemsPerRow() || !containerRef.current || !listRef.current) return;

    const listEl = listRef.current;
    const containerEl = containerRef.current;
    stepSize.current = containerEl.clientWidth ?? 0;

    const updateItemsSize = () =>
      setItemsSize(listRef.current, containerRef.current, itemsPerRow(), pixelsBetweenItems);

    const toggleButtons = () => {
      const buttons = Array.from(containerEl.getElementsByTagName('button'));
      buttons.forEach((button, idx) => {
        const isLast = idx + 1 === buttons.length;
        const allItemsFit = items(listEl).length <= itemsPerRow();
        const scrollStartReached = scrollPosition.current <= 0;
        const scrollEndReached = scrollPosition.current >= listEl.scrollWidth - stepSize.current;
        const shouldHide = allItemsFit || isLast ? scrollEndReached : scrollStartReached;
        (button as any).style = `${button.style.cssText ?? ''}; ${arrowsStyle.cssText ?? ''}`;
        button.style.display = shouldHide ? 'none' : 'block';
      });
    };

    const resetScroll = () => {
      scrollPosition.current = 0;
      stepSize.current = containerEl.clientWidth ?? 0;
      scrollTo(listRef.current, 0);
    };

    const updateItemsPerResolution = () => {
      setItemsPerResolution(itemsPerRow());
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

    updateItemsSize();
    toggleButtons();
    updateItemsPerResolution();
    window.addEventListener('resize', updateItemsPerResolution);
    window.addEventListener('resize', resetScroll);
    window.addEventListener('resize', updateItemsSize);
    window.addEventListener('resize', toggleButtons);
    listEl?.addEventListener('scroll', toggleButtons);
    loopedScroll && listEl?.addEventListener('scroll', createElementsForLoop);

    return () => {
      window.removeEventListener('resize', updateItemsPerResolution);
      window.removeEventListener('resize', resetScroll);
      window.removeEventListener('resize', updateItemsSize);
      window.removeEventListener('resize', toggleButtons);
      listEl?.removeEventListener('scroll', toggleButtons);
      loopedScroll && listEl?.removeEventListener('scroll', createElementsForLoop);
    };
  }, [loopedScroll, itemsPerRow, arrowsStyle, pixelsBetweenItems]);

  useLayoutEffect(() => {
    setItemsSize(listRef.current, containerRef.current, itemsPerRow(), pixelsBetweenItems);
  }, [itemsPerRow, itemsPerResolution, pixelsBetweenItems]);

  const handleScrollBack = useCallback(() => {
    if (scrollPosition.current < 0) return;
    const scrollEndReached = scrollPosition.current + stepSize.current >= wholeScrollWidth();
    const newScrollPos =
      (scrollEndReached ? wholeScrollWidth() - stepSize.current * 2 : scrollPosition.current - stepSize.current) -
      pixelsBetweenItems;
    scrollPosition.current = newScrollPos > 0 ? newScrollPos : 0;
    scrollTo(listRef.current, scrollPosition.current);
  }, [pixelsBetweenItems]);

  const handleScrollForward = useCallback(() => {
    if (scrollPosition.current > wholeScrollWidth()) return;
    const endWillBeReached = scrollPosition.current + stepSize.current >= wholeScrollWidth();
    scrollPosition.current =
      (scrollPosition.current > 0 ? scrollPosition.current + stepSize.current : stepSize.current) +
      pixelsBetweenItems -
      (endWillBeReached ? pixelsBetweenItems / itemsPerResolution : 0);
    scrollTo(listRef.current, scrollPosition.current);
  }, [pixelsBetweenItems, itemsPerResolution]);

  return useMemo(
    () => ({
      listRef,
      containerRef,
      scrollForward: handleScrollForward,
      scrollBack: handleScrollBack,
      itemsPerResolution,
    }),
    [listRef, containerRef, handleScrollForward, handleScrollBack, itemsPerResolution],
  );
};

const setItemsSize = (
  listEl: HTMLDivElement | null,
  containerEl: HTMLDivElement | null,
  itemsPerRow: number,
  pixelsBetweenItems: number,
) => {
  const spaceWidth = (containerEl?.clientWidth ?? 0) / itemsPerRow;
  const width = spaceWidth - pixelsBetweenItems + pixelsBetweenItems / itemsPerRow;
  items(listEl).forEach(item => {
    (item as any).style = `width: ${width}px; min-width: ${width}px; ${item.style.cssText ?? ''}`;
  });
};

const items = (listEl: HTMLDivElement | null) => (listEl ? Array.from(listEl.getElementsByTagName('li')) : []);

const scrollTo = (listEl: HTMLDivElement | null, to: number) => listEl?.scrollTo({ left: to, behavior: 'smooth' });
