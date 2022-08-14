type HTMLListElement = HTMLUListElement & { current: string };

export class ScrollableElement {
  public stepSize: number = 0;
  public scrollPosition: number = 0;
  public element: HTMLListElement | null;
  private readonly _itemsMargin: number;

  constructor(el: HTMLDivElement | null, itemsMargin: number) {
    this.element = el as typeof this.element;
    this._itemsMargin = itemsMargin;
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

    if (!list || !fitCount || !this.stepSize) return;

    const startReached = this.scrollPosition - this.stepSize < 0;
    if (startReached) {
      for (let i = 0; i < fitCount; i++) {
        list.lastChild && list.prepend(list.lastChild.cloneNode(true));
        list.lastChild?.remove();
      }
    }

    const endReached = this.scrollPosition + this.stepSize > this.scrollWidth;
    if (endReached) {
      for (let i = 0; i < fitCount; i++) {
        list.firstChild && list.append(list.firstChild.cloneNode(true));
        list.firstChild?.remove();
      }
    }

    list.style.setProperty('transition', 'none');
    startReached && this._scrollHorizontal(this.scrollPosition + this.stepSize + this._itemsMargin);
    endReached && this._scrollHorizontal(this.scrollPosition - this.stepSize - this._itemsMargin);
    setTimeout(() => list.style.removeProperty('transition'), 0);
  }

  scrollBack(_looped = false) {
    if (!this.element || this.scrollPosition < 0) return;
    const scrollStartReached = this.scrollPosition + this.stepSize >= this.scrollWidth;
    const newScrollPos =
      (scrollStartReached ? this.scrollPosition - this.stepSize : this.scrollPosition - this.stepSize) -
      this._itemsMargin;
    this._scrollHorizontal(newScrollPos > 0 ? newScrollPos : 0);
  }

  scrollForward(looped = false) {
    if (!this.element || this.scrollPosition > this.scrollWidth) return;
    const scrollEndReached = this.scrollPosition + this.stepSize * 2 >= this.scrollWidth;
    this._scrollHorizontal(
      scrollEndReached && !looped
        ? this.scrollWidth - this.stepSize
        : this.scrollPosition + this.stepSize + this._itemsMargin,
    );
  }

  private _scrollHorizontal(left: number) {
    this.scrollPosition = left;
    this.innerList?.style.setProperty('transform', `translateX(${-left}px)`);
  }
}
