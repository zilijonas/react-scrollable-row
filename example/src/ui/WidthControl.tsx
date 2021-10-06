import React from 'react';

interface Props {
  width: number;
  onWidthChanged(width: number): void;
}

const EXAMPLE_WIDTHS = [300, 600, 1200, 1500];

export const WidthControl: React.FC<Props> = ({ width, onWidthChanged }) => {
  return (
    <div className="widthControl">
      <label>List's width in pixels</label>
      <input type="number" value={width} onChange={handleWidthChange} />
      <div className="widthControlButtons">
        {EXAMPLE_WIDTHS.map(w => (
          <button key={w} onClick={handlePredefinedWidthClick(w)}>
            {w}px
          </button>
        ))}
      </div>
    </div>
  );

  function handleWidthChange({ target: { value } }: React.ChangeEvent<HTMLInputElement>) {
    onWidthChanged(+value);
  }

  function handlePredefinedWidthClick(predefinedWidth: number) {
    return () => onWidthChanged(predefinedWidth);
  }
};
