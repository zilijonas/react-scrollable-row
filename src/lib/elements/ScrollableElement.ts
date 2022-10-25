type HTMLListElement = HTMLUListElement & { current: string };

export class ScrollableElement {
  public stepSize: number = 0;
  public scrollPosition: number = 0;
  public element: HTMLListElement | null;
  // private _givenItemsCount: number = 0;

  constructor(el: HTMLDivElement | null, _givenItemsCount: number) {
    this.element = el as typeof this.element;
    // this._givenItemsCount = givenItemsCount;
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
