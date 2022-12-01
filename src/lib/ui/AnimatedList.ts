import { delay, delayTillNextFrame } from '../async';
import { Order } from './Order';

export type ListButtons = [HTMLDivElement, HTMLDivElement] | null;

export class AnimatedList {
  public shownItemsCount: number;
  public element: HTMLDivElement;
  private _order: Order;
  private _itemMargin: number;
  private _buttons: ListButtons | null;
  private _animationTime: number;

  constructor(
    listEl: HTMLDivElement,
    buttons: ListButtons | null,
    shownItemsCount: number,
    itemMargin: number,
    slideTime: number,
    order: Order,
  ) {
    this.shownItemsCount = shownItemsCount;
    this.element = listEl;
    this._buttons = buttons;
    this._itemMargin = itemMargin;
    this._animationTime = slideTime;
    this._order = order;
  }

  get length() {
    return this.element.getElementsByTagName('ul')[0].children.length;
  }

  get itemWidth() {
    return this.element.clientWidth / this.shownItemsCount - this._itemMargin;
  }

  get itemHeight() {
    return this.element.getElementsByTagName('ul')[0].children.item(0)?.clientHeight ?? 0;
  }

  get listWidth() {
    return (this.element.clientWidth / this.shownItemsCount) * this.length;
  }

  get stepSize() {
    return this.element.clientWidth;
  }

  get remainderStepSize() {
    return (this.stepSize / this.shownItemsCount) * (this.length % this.shownItemsCount) || this.stepSize;
  }

  public slide(x: number, time?: number) {
    updateListAnimationTime(this.element, time ?? this._animationTime);
    updateListPosition(this.element, x);
  }

  public slideAndSwapForward(x: number) {
    this.slide(x);
    delay(() => {
      this._order.reorder(this.length % this.shownItemsCount);
      this.slide(0, 0);
    }, this._animationTime);
  }

  public slideAndSwapBack(x: number) {
    this._order.reorder();
    this.slide(x, 0);
    delayTillNextFrame(() => this.slide(0));
  }

  public disableBack() {
    this._buttons?.[0].setAttribute('hidden', 'true');
  }

  public enableBack() {
    this._buttons?.[0].removeAttribute('hidden');
  }

  public disableForward() {
    this._buttons?.[1].setAttribute('hidden', 'true');
  }

  public enableForward() {
    this._buttons?.[1].removeAttribute('hidden');
  }

  public updateItemsWidth() {
    (Array.from(this.element.getElementsByTagName('ul')[0].children) as HTMLLIElement[]).forEach(item => {
      item.style.setProperty('width', `${this.itemWidth}px`);
      item.style.setProperty('min-width', `${this.itemWidth}px`);
    });
  }
}

const updateListPosition = (el: HTMLDivElement | null, position: number) =>
  !Number.isNaN(position) && el?.style.setProperty('left', `${-position}px`);

const updateListAnimationTime = (el: HTMLDivElement | null, time: number) =>
  el?.style.setProperty('transition', `left ${time}ms ease-in-out`);
