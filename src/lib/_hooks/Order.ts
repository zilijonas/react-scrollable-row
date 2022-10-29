import { countListItems, updateListOrder } from './DOM-utils';

export class Order {
  private listEl: HTMLDivElement | null;
  private orderedPositions: number[];
  private locked: number;

  constructor(listEl: HTMLDivElement | null, locked: number) {
    this.listEl = listEl;
    this.locked = locked;
    this.orderedPositions = Array.from(Array(countListItems(listEl)).keys());
  }

  get current() {
    return this.orderedPositions;
  }

  reorder() {
    this.orderedPositions = divideAtXAndSwap(this.locked, this.orderedPositions);
    updateListOrder(this.listEl, this.orderedPositions);
  }
}

const divideAtXAndSwap = (x: number, list: number[]) => [...list.slice(x), ...list.slice(0, x)];
