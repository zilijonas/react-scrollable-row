import React from 'react';
import { SlideableProps } from '../../../dist';

interface Props {
  width: SlideableProps['width'];
  onWidthChanged(width: SlideableProps['width']): void;
}

const EXAMPLE_WIDTHS: SlideableProps['width'][] = [300, 600, 1200, 1500, '100%'];

export const WidthControl: React.FC<Props> = ({ width, onWidthChanged }) => {
  return (
    <div className="widthControl">
      <label>List's width in pixels</label>
      <input type="number" value={width === '100%' ? window.innerWidth : width} onChange={handleWidthChange} />
      <div className="widthControlButtons">
        {EXAMPLE_WIDTHS.map(w => (
          <button key={w} onClick={handlePredefinedWidthClick(w)}>
            {w === '100%' ? 'Full width' : `${w}px`}
          </button>
        ))}
      </div>
    </div>
  );

  function handleWidthChange({ target: { value } }: React.ChangeEvent<HTMLInputElement>) {
    onWidthChanged(+value);
  }

  function handlePredefinedWidthClick(predefinedWidth: SlideableProps['width']) {
    return () => onWidthChanged(predefinedWidth);
  }
};
