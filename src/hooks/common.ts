export type ItemsPerResolutionConfig = { [pixels: number]: number } & { max: number };

export const scrollTo = (listEl: HTMLDivElement | null, to: number) =>
  listEl?.scrollTo({ left: to, behavior: 'smooth' });

export const listItems = (listEl: HTMLDivElement | null) =>
  listEl ? Array.from(listEl.getElementsByTagName('li')) : [];
