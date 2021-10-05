import React, { useState } from 'react';
import { Slideable } from 'react-slideable';
import 'react-slideable/dist/index.css';

const items = [1, 2, 3, 4, 5, 6, 7, 8];

const Box: React.FC = ({ children }) => (
  <div className="item-box">
    <span>{children}</span>
  </div>
);

export const App: React.FC = () => {
  const [width, setWidth] = useState(500);

  return (
    <div className="page-container">
      <label>Slideable's Width</label>
      <input type="number" value={width} onChange={({ target: { value } }) => setWidth(+value)} />
      <label>Looped list of 8 elements</label>
      <div className="slideable-container" style={{ width }}>
        <Slideable
          key={width}
          looped
          pixelsBetweenItems={8}
          buttonsStyle={{ background: '#F77' }}
          items={items.map(item => (
            <Box key={item}>{item}</Box>
          ))}
        />
      </div>
      <label>Finite list of 2 elements with a placeholder</label>
      <div className="slideable-container" style={{ width }}>
        <Slideable
          key={width}
          placeholderElement={<Box>?</Box>}
          pixelsBetweenItems={8}
          buttonsStyle={{ background: '#77F' }}
          items={items.slice(0, 2).map(item => (
            <Box key={item}>{item}</Box>
          ))}
        />
      </div>
    </div>
  );
};
