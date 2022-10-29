export const countListItems = (listEl: HTMLDivElement | null) =>
  Array.from(listEl?.getElementsByTagName('ul')[0].children ?? []).length;

export const updateListOrder = (el: HTMLDivElement | null, orderedPositions?: number[]) =>
  orderedPositions?.forEach((position, index) => {
    const item = el?.getElementsByTagName('ul')[0].children.item(index) as HTMLDivElement | null;
    item?.style.setProperty('order', `${position}`);
  });
