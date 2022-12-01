import React, { useState } from 'react';
import { Slideable, SlideableProps } from 'react-slideable';
import 'react-slideable/dist/index.css';
import { ListItem } from './ui/ListItem';
import { PlaceholderItem } from './ui/PlaceholderItem';
import { WidthControl } from './ui/WidthControl';

const items = [1, 2, 3, 4, 5, 6, 7, 8];

export const App: React.FC = () => {
  const [width, setWidth] = useState<SlideableProps['width']>('100%');

  return (
    <div className="pageContainer">
      <h1>React Slideable</h1>
      <label>Finite with placeholder</label>
      <div className="listContainer">
        <Slideable
          key={width}
          width={width}
          itemsGap={8}
          type="auto"
          displayConfig={2}
          items={items.slice(0, 3).map(item => (
            <ListItem key={item}>{item}</ListItem>
          ))}
        />
      </div>
      <div className="listContainer">
        <Slideable
          key={width}
          width={width}
          placeholder={<PlaceholderItem />}
          itemsGap={8}
          items={items.slice(0, 1).map(item => (
            <ListItem key={item}>{item}</ListItem>
          ))}
        />
      </div>
      <label>Finite swipeable</label>
      <div className="listContainer">
        <Slideable
          key={width}
          width={width}
          itemsGap={8}
          swipeable
          items={items.map(item => (
            <ListItem key={item}>{item}</ListItem>
          ))}
        />
      </div>
      <label>Infinite</label>
      <div className="listContainer">
        <Slideable
          type="infinite"
          key={width}
          width={width}
          itemsGap={8}
          items={items.map(item => (
            <ListItem key={item}>{item}</ListItem>
          ))}
        />
      </div>
      <WidthControl width={width} onWidthChanged={setWidth} />
    </div>
  );
};
