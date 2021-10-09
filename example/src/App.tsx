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
      <label>8 elements</label>
      <div className="listContainer">
        <Slideable
          key={width}
          width={width}
          marginBetweenItems={8}
          items={items.map(item => (
            <ListItem key={item}>{item}</ListItem>
          ))}
        />
      </div>
      <label>Looped 8 elements</label>
      <div className="listContainer">
        <Slideable
          looped
          key={width}
          width={width}
          marginBetweenItems={8}
          items={items.map(item => (
            <ListItem key={item}>{item}</ListItem>
          ))}
        />
      </div>
      <label>1 element with a placeholder</label>
      <div className="listContainer">
        <Slideable
          key={width}
          width={width}
          placeholderElement={<PlaceholderItem />}
          marginBetweenItems={8}
          items={items.slice(0, 1).map(item => (
            <ListItem key={item}>{item}</ListItem>
          ))}
        />
      </div>
      <WidthControl width={width} onWidthChanged={setWidth} />
      <label>8 elements, full page width scroll</label>
      <div className="listContainer" style={{ width: '100%' }}>
        <Slideable
          key={width}
          marginBetweenItems={8}
          items={items.map(item => (
            <ListItem key={item}>{item}</ListItem>
          ))}
        />
      </div>
    </div>
  );
};