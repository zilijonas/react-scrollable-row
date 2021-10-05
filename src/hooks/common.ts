/**
 * You can set how many items will list display at given resolutions.
 * Default values:
 * `{ 480: 2, 900: 3, 1500: 4, max: 5 }`
 * Max stands for all resolutions that are bigger than the last of your defined ones (in this case >1500).
 * */
export type ItemsPerResolutionConfig = { [pixels: number]: number } & { max: number };

export const scrollTo = (listEl: HTMLDivElement | null, to: number) =>
  listEl?.scrollTo({ left: to, behavior: 'smooth' });

export const listItems = (listEl: HTMLDivElement | null) =>
  listEl ? Array.from(listEl.getElementsByTagName('li')) : [];

export const DEFAULT_ITEMS_PER_RESOLUTION_CONFIG: ItemsPerResolutionConfig = {
  480: 2,
  900: 3,
  1500: 4,
  max: 5,
};
