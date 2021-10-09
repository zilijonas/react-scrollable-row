import React, { useState } from 'react';
import { Slideable } from 'react-slideable';
import 'react-slideable/dist/index.css';
import { ListItem } from './ui/ListItem';
import { PlaceholderItem } from './ui/PlaceholderItem';
import { WidthControl } from './ui/WidthControl';

const items = [1, 2, 3, 4, 5, 6, 7, 8];

export const App: React.FC = () => {
  const [width, setWidth] = useState(500);

  return (
    <div className="pageContainer">
      <h1>React Slideable</h1>
      <label>List of 1 element with a placeholder</label>
      <div className="listContainer" style={{ width }}>
        <Slideable
          key={width}
          placeholderElement={<PlaceholderItem />}
          pixelsBetweenItems={8}
          items={items.slice(0, 1).map(item => (
            <ListItem key={item}>{item}</ListItem>
          ))}
        />
      </div>
      <label>List of 8 elements</label>
      <div className="listContainer" style={{ width }}>
        <Slideable
          key={width}
          pixelsBetweenItems={8}
          items={items.map(item => (
            <ListItem key={item}>{item}</ListItem>
          ))}
        />
      </div>
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
      <WidthControl width={width} onWidthChanged={setWidth} />
    </div>
  );
};
