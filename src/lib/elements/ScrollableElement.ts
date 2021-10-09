type Listener = <K extends keyof HTMLElementEventMap>(this: HTMLDivElement, ev?: HTMLElementEventMap[K]) => void;

type HTMLListElement = HTMLUListElement & { current: string };

export class ScrollableElement {
  public stepSize: number = 0;
  public scrollPosition: number = 0;
  private _element: HTMLListElement | null;

  constructor(element: HTMLDivElement | null) {
    this._element = element as typeof this._element;
  }

  get items() {
    return Array.from(this._element?.getElementsByTagName('li') ?? []);
  }

  get current() {
    return this._element?.current;
  }

  get innerList(): HTMLListElement | null {
    return this._element?.getElementsByTagName('ul')[0] as HTMLListElement;
  }

  get width() {
    return this._element?.clientWidth ?? 0;
  }

  get scrollWidth() {
    return this._element?.scrollWidth ?? 0;
  }

  updateItemsSize(containerWidth: number, fittedItemsCount: number, itemsMargin: number) {
    const spaceWidth = containerWidth / fittedItemsCount;
    const width = spaceWidth - itemsMargin + itemsMargin / fittedItemsCount;
    this.items.forEach(item => {
      (item as any).style = `${item.style.cssText ?? ''}; width: ${width}px; min-width: ${width}px;`;
    });
  }

  cloneElements(fittedItemsCount: number) {
    const list = this.innerList;
    const maxScroll = this.scrollWidth - this.width;
    const allItemsFit = this.items.length <= fittedItemsCount;
    if (!list || (this.scrollPosition + this.stepSize < maxScroll && !allItemsFit)) return;
    const current = parseInt(list?.dataset.current!, 10);
    list.appendChild(this.items[current].cloneNode(true));
    list.dataset.current = (current + 1).toString();
  }

  scrollBack(itemsMargin: number) {
    if (!this._element || this.scrollPosition < 0) return;
    const scrollEndReached = this.scrollPosition + this.stepSize >= this.scrollWidth;
    const newScrollPos =
      (scrollEndReached ? this.scrollWidth - this.stepSize * 2 : this.scrollPosition - this.stepSize) - itemsMargin;
    this._scrollHorizontal(newScrollPos > 0 ? newScrollPos : 0);
  }

  scrollForward(itemsMargin: number, fittedItemsCount: number) {
    if (!this._element || this.scrollPosition > this.scrollWidth) return;
    const endWillBeReached = this.scrollPosition + this.stepSize >= this.scrollWidth;
    this._scrollHorizontal(
      (this.scrollPosition > 0 ? this.scrollPosition + this.stepSize : this.stepSize) +
        itemsMargin -
        (endWillBeReached ? itemsMargin / fittedItemsCount : 0),
    );
  }

  updateStepSize(stepSize: number) {
    this.stepSize = stepSize;
    this._scrollHorizontal(0);
  }

  addScrollListener(listener: Listener) {
    this._element?.addEventListener('scroll', listener);
  }

  clearScrollListener(listener: Listener) {
    this._element?.removeEventListener('scroll', listener);
  }

  private _scrollHorizontal(left: number) {
    this.scrollPosition = left;
    this._element?.scrollTo({ left, behavior: 'smooth' });
  }
}
