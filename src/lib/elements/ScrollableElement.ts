type HTMLListElement = HTMLUListElement & { current: string };

export class ScrollableElement {
  public stepSize: number = 0;
  public scrollPosition: number = 0;
  public element: HTMLListElement | null;
  private readonly _itemsMargin: number;
  // private readonly _count: number;
  // private _ogItems: readonly HTMLLIElement[];

  constructor(el: HTMLDivElement | null, itemsMargin: number) {
    this.element = el as typeof this.element;
    this._itemsMargin = itemsMargin;
    // this._ogItems = Object.freeze(this.items.map(item => item.cloneNode(true) as HTMLLIElement));
    // this._count = this._ogItems.length;
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
    return this.innerList?.scrollWidth ?? 0;
  }

  updateStepSize(stepSize: number) {
    this.stepSize = stepSize;
    this._scrollHorizontal(0);
  }

  updateItemsSize(containerWidth: number, fitCount: number) {
    const spaceWidth = containerWidth / fitCount;
    const width = spaceWidth - this._itemsMargin + this._itemsMargin / fitCount;
    this.items.forEach(item => {
      (item as any).style = `${item.style.cssText ?? ''}; width: ${width}px; min-width: ${width}px;`;
    });
  }

  cloneElements(fitCount: number) {
    const list = this.innerList;

    if (!list || !fitCount) return;

    const startReached = this.scrollPosition - this.stepSize < 0;
    if (startReached) {
      for (let i = 0; i < fitCount; i++) {
        list.lastChild && list.prepend(list.lastChild.cloneNode(true));
        list.lastChild?.remove();
      }
      list.style.setProperty('transition', 'none');
      this.scrollForward(fitCount);
      setTimeout(() => list.style.removeProperty('transition'), 0);
    }

    const endReached = this.scrollPosition + this.stepSize > this.scrollWidth;
    if (endReached) {
      for (let i = 0; i < fitCount; i++) {
        list.firstChild && list.append(list.firstChild.cloneNode(true));
        list.firstChild?.remove();
      }
      list.style.setProperty('transition', 'none');
      this.scrollBack();
      setTimeout(() => list.style.removeProperty('transition'), 0);
    }
  }

  scrollBack() {
    if (!this.element || this.scrollPosition < 0) return;
    const scrollEndReached = this.scrollPosition + this.stepSize >= this.scrollWidth;
    const newScrollPos =
      (scrollEndReached ? this.scrollPosition - this.stepSize : this.scrollPosition - this.stepSize) -
      this._itemsMargin;
    this._scrollHorizontal(newScrollPos > 0 ? newScrollPos : 0);
  }

  scrollForward(fitCount: number) {
    if (!this.element || this.scrollPosition > this.scrollWidth) return;
    const endWillBeReached = this.scrollPosition + this.stepSize >= this.scrollWidth;
    this._scrollHorizontal(
      (this.scrollPosition > 0 ? this.scrollPosition + this.stepSize : this.stepSize) +
        this._itemsMargin -
        (endWillBeReached ? this._itemsMargin / fitCount : 0),
    );
  }

  private _scrollHorizontal(left: number) {
    this.scrollPosition = left;
    this.innerList?.style.setProperty('transform', `translateX(${-left}px)`);
  }
}
