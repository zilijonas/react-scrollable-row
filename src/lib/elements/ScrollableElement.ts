type HTMLListElement = HTMLUListElement & { current: string };

export class ScrollableElement {
  public stepSize: number = 0;
  public scrollPosition: number = 0;
  public element: HTMLListElement | null;

  constructor(el: HTMLDivElement | null) {
    this.element = el as typeof this.element;
  }

  get items() {
    return Array.from(this.element?.getElementsByTagName('li') ?? []);
  }

  get current() {
    return this.element?.current;
  }

  get innerList(): HTMLListElement | null {
    return this.element?.getElementsByTagName('ul')[0] as HTMLListElement;
  }

  get width() {
    return this.element?.clientWidth ?? 0;
  }

  get scrollWidth() {
    return this.element?.scrollWidth ?? 0;
  }

  updateItemsSize(containerWidth: number, fitCount: number, itemsMargin: number) {
    const spaceWidth = containerWidth / fitCount;
    const width = spaceWidth - itemsMargin + itemsMargin / fitCount;
    this.items.forEach(item => {
      (item as any).style = `${item.style.cssText ?? ''}; width: ${width}px; min-width: ${width}px;`;
    });
  }

  cloneElements(fitCount: number) {
    const list = this.innerList;
    const maxScroll = this.scrollWidth - this.width;
    const allItemsFit = this.items.length <= fitCount;
    if (!list || (this.scrollPosition + this.stepSize < maxScroll && !allItemsFit)) return;
    const current = parseInt(list?.dataset.current!, 10);
    list.appendChild(this.items[current].cloneNode(true));
    list.dataset.current = (current + 1).toString();
  }

  scrollBack(itemsMargin: number) {
    if (!this.element || this.scrollPosition < 0) return;
    const scrollEndReached = this.scrollPosition + this.stepSize >= this.scrollWidth;
    const newScrollPos =
      (scrollEndReached ? this.scrollWidth - this.stepSize * 2 : this.scrollPosition - this.stepSize) - itemsMargin;
    this._scrollHorizontal(newScrollPos > 0 ? newScrollPos : 0);
  }

  scrollForward(itemsMargin: number, fitCount: number) {
    if (!this.element || this.scrollPosition > this.scrollWidth) return;
    const endWillBeReached = this.scrollPosition + this.stepSize >= this.scrollWidth;
    this._scrollHorizontal(
      (this.scrollPosition > 0 ? this.scrollPosition + this.stepSize : this.stepSize) +
        itemsMargin -
        (endWillBeReached ? itemsMargin / fitCount : 0),
    );
  }

  updateStepSize(stepSize: number) {
    this.stepSize = stepSize;
    this._scrollHorizontal(0);
  }

  private _scrollHorizontal(left: number) {
    this.scrollPosition = left;
    this.element?.scrollTo({ left, behavior: 'smooth' });
  }
}
