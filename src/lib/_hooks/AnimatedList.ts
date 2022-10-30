import { DEFAULT_TIME } from '../constants';
import { delay, delayTillNextFrame } from './async-utils';
import { countListItems } from './DOM-utils';
import { Order } from './Order';

export class AnimatedList {
  public listWidth: number;
  public stepSize: number;
  public remainderStepSize: number;
  public itemsCount: number;
  public shownItemsCount: number;
  private _listEl: HTMLDivElement | null;
  private _buttons: HTMLDivElement[];
  private _order: Order;

  constructor(listEl: HTMLDivElement, buttons: HTMLDivElement[], shownItemsCount: number) {
    this.itemsCount = countListItems(listEl);
    this.shownItemsCount = shownItemsCount;
    this.stepSize = listEl.clientWidth;
    this.listWidth = (listEl.clientWidth / shownItemsCount) * this.itemsCount;
    this.remainderStepSize = (this.stepSize / shownItemsCount) * (this.itemsCount % shownItemsCount) || this.stepSize;
    this._listEl = listEl;
    this._buttons = buttons;
    this._order = new Order(listEl, shownItemsCount);
  }

  public slide(x: number, time: number = DEFAULT_TIME) {
    updateListAnimationTime(this._listEl, time);
    updateListPosition(this._listEl, x);
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
