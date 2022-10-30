import { DEFAULT_TIME } from '../constants';
import { delay, delayTillNextFrame } from './async-utils';
import { Order } from './Order';

export type AnimatedButtons = [HTMLDivElement, HTMLDivElement];

export class AnimatedList {
  public shownItemsCount: number;
  public element: HTMLDivElement;
  private _order: Order;
  private _items: HTMLLIElement[];
  private _buttons: HTMLDivElement[];
  private _itemMargin: number;

  constructor(listEl: HTMLDivElement, buttons: AnimatedButtons, shownItemsCount: number, itemMargin: number) {
    this.shownItemsCount = shownItemsCount;
    this.element = listEl;
    this._buttons = buttons;
    this._itemMargin = itemMargin;
    this._order = new Order(listEl, shownItemsCount);
    this._items = Array.from(listEl.getElementsByTagName('ul')[0].children) as HTMLLIElement[];
  }

  get length() {
    return this._items.length;
  }

  get itemWidth() {
    return this.element.clientWidth / this.shownItemsCount - this._itemMargin;
  }

  get listWidth() {
    return (this.element.clientWidth / this.shownItemsCount) * this._items.length;
  }

  get stepSize() {
    return this.element.clientWidth;
  }

  get remainderStepSize() {
    return (this.stepSize / this.shownItemsCount) * (this._items.length % this.shownItemsCount) || this.stepSize;
  }

  public updateItemsWidth() {
    console.log(this._items);
    this._items.forEach(item => {
      item.style.setProperty('width', `${this.itemWidth}px`);
      item.style.setProperty('min-width', `${this.itemWidth}px`);
    });
  }

  public slide(x: number, time: number = DEFAULT_TIME) {
    updateListAnimationTime(this.element, time);
    updateListPosition(this.element, x);
  }

  public slideAndSwapForward(x: number) {
    this.slide(x);
    delay(() => {
      this._order.reorder();
      this.slide(0, 0);
    });
  }

  public slideAndSwapBack(x: number) {
    this._order.reorder();
    this.slide(x, 0);
    delayTillNextFrame(() => this.slide(0));
  }

  public disableBack() {
    this._buttons[0].setAttribute('hidden', 'true');
  }

  public enableBack() {
    this._buttons[0].removeAttribute('hidden');
  }

  public disableForward() {
    this._buttons[1].setAttribute('hidden', 'true');
  }

  public enableForward() {
    this._buttons[1].removeAttribute('hidden');
  }
}

const updateListPosition = (el: HTMLDivElement | null, position: number) =>
  !Number.isNaN(position) && el?.style.setProperty('left', `${-position}px`);

const updateListAnimationTime = (el: HTMLDivElement | null, time: number) =>
  el?.style.setProperty('transition', `left ${time}ms ease-in-out`);
