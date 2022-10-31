import { delayTillNextFrame } from '../async';

export class Order {
  private _listEl: HTMLDivElement | null;
  private _orderedPositions: number[];
  private _locked: number;

  constructor(listEl: HTMLDivElement | null, locked: number) {
    this._listEl = listEl;
    this._locked = locked;
    delayTillNextFrame(() => {
      this._orderedPositions = Array.from(Array(countListItems(listEl)).keys());
    });
  }

  get current() {
    return this._orderedPositions;
  }

  reorder(slicePositionShift: number = 0) {
    this._orderedPositions = divideAtXAndSwap(this._locked + slicePositionShift, this._orderedPositions);
    updateListOrder(this._listEl, this._orderedPositions);
  }
}

const divideAtXAndSwap = (x: number, list: number[]) => [...list.slice(x), ...list.slice(0, x)];

const countListItems = (listEl: HTMLDivElement | null) => listEl?.getElementsByTagName('ul')[0].children.length ?? 0;

const updateListOrder = (el: HTMLDivElement | null, orderedPositions?: number[]) =>
  orderedPositions?.forEach((position, index) => {
    const item = el?.getElementsByTagName('ul')[0].children.item(index) as HTMLDivElement | null;
    item?.style.setProperty('order', `${position}`);
  });
