import { ScrollableElement } from '../elements';
import { useListener } from './useListener';

interface Props {
  listEl: ScrollableElement | null;
  fitCount: number;
  looped: boolean;
}
export const useItemsLoop = ({ listEl, fitCount, looped }: Props) =>
  useListener('scroll', looped && listEl && (() => listEl?.cloneElements(fitCount)), [listEl, looped, fitCount]);
