type HTMLListElement = HTMLUListElement & { current: string };

export class ScrollableElement {
  public stepSize: number = 0;
  public scrollPosition: number = 0;
  public element: HTMLListElement | null;
  private readonly _itemsMargin: number;
  private readonly _count: number;
  private _ogItems: readonly HTMLLIElement[];

  constructor(el: HTMLDivElement | null, itemsMargin: number) {
    this.element = el as typeof this.element;
    this._itemsMargin = itemsMargin;
    this._ogItems = Object.freeze(this.items.map(item => item.cloneNode(true) as HTMLLIElement));
    this._count = this._ogItems.length;
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
    const maxScroll = this.scrollWidth - this.width;
    const allItemsFit = this.items.length <= fitCount;
    const haventReachedEnd = this.scrollPosition + this.stepSize < maxScroll;
    // console.log('tried?');

    if (!list || !fitCount || (haventReachedEnd && !allItemsFit)) return;
    const prevCurrent = parseInt(list?.dataset.current!, 10);
    for (let i = 0; i < fitCount; i++) {
      const current = (prevCurrent + i) % this._count;
      // console.log(this._ogItems[current].innerText);
      list.appendChild(this._ogItems[current].cloneNode(true));
      list.dataset.current = ((current + 1) % this._count).toString();
    }
    if (list.children.length > fitCount * 2 && this.scrollPosition) {
      for (let i = 0; i < fitCount; i++) {
        list.firstChild?.remove();
      }
      list.style.setProperty('transition', 'none');
      this.scrollBack();
      setTimeout(() => list.style.removeProperty('transition'), 0);
      // list.style.removeProperty('transition');
      // list.classList.remove('notransition');
    }
    console.log(this.innerList?.children.length);

    // this._scrollHorizontal(this.scrollPosition - this.stepSize - this._itemsMargin * 3);

    // const prevCurrent = parseInt(list?.dataset.current!, 10);
    // const current = prevCurrent >= this._count ? 0 : prevCurrent;
    // list.appendChild(this._ogItems[current].cloneNode(true));
    // if (current > fitCount && this.items.length > this._count) {
    // this._scrollHorizontal(this.scrollPosition - this.stepSize, 'smooth');
    // for (let i = 0; i < fitCount; i++) this.items[i].remove();
    // }
    // console.log(this.items[0].innerText, this.items.length);
    // list.dataset.current = (current + 1).toString();
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
