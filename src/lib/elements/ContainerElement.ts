export class ContainerElement {
  private _element: HTMLDivElement | null;

  constructor(element: HTMLDivElement | null) {
    this._element = element;
  }

  get width() {
    return this._element?.clientWidth ?? 0;
  }

  toggleButtons(allItemsFit: boolean, scrollStartReached: boolean, scrollEndReached: boolean) {
    const buttons = Array.from(this._element?.getElementsByTagName('button') ?? []);
    buttons.forEach((button, idx) => {
      const isLast = idx + 1 === buttons.length;
      const shouldHide = allItemsFit || isLast ? scrollEndReached : scrollStartReached;
      button.style.display = shouldHide ? 'none' : 'block';
    });
  }
}
