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

const countListItems = (listEl: HTMLDivElement | null) =>
  Array.from(listEl?.getElementsByTagName('ul')[0].children ?? []).length;

const updateListOrder = (el: HTMLDivElement | null, orderedPositions?: number[]) =>
  orderedPositions?.forEach((position, index) => {
    const item = el?.getElementsByTagName('ul')[0].children.item(index) as HTMLDivElement | null;
    item?.style.setProperty('order', `${position}`);
  });
