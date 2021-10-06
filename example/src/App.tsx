import React, { useState } from 'react';
import { Slideable } from 'react-slideable';
import 'react-slideable/dist/index.css';
import { ListItem } from './ui/ListItem';
import { WidthControl } from './ui/WidthControl';

const items = [1, 2, 3, 4, 5, 6, 7, 8];

export const App: React.FC = () => {
  const [width, setWidth] = useState(500);

  return (
    <div className="pageContainer">
      <h1>React Slideable</h1>
      <label>Looped list of 8 elements</label>
      <div className="listContainer" style={{ width }}>
        <Slideable
          key={width}
          looped
          pixelsBetweenItems={8}
          items={items.map(item => (
            <ListItem key={item}>{item}</ListItem>
          ))}
        />
      </div>
      <label>Finite list of 2 elements with a placeholder</label>
      <div className="listContainer" style={{ width }}>
        <Slideable
          key={width}
          placeholderElement={<ListItem>?</ListItem>}
          pixelsBetweenItems={8}
          items={items.slice(0, 2).map(item => (
            <ListItem key={item}>{item}</ListItem>
          ))}
        />
      </div>
      <WidthControl width={width} onWidthChanged={setWidth} />
    </div>
  );
};
