import React, { useState } from 'react';
import { Slideable, SlideableProps } from 'react-slideable';
import 'react-slideable/dist/index.css';
import { ListItem } from './ui/ListItem';
import { PlaceholderItem } from './ui/PlaceholderItem';
import { WidthControl } from './ui/WidthControl';

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const App: React.FC = () => {
  const [width, setWidth] = useState<SlideableProps['width']>(500);

  return (
    <div className="pageContainer">
      <h1>React Slideable</h1>
      <label>8 elements</label>
      <div className="listContainer">
        <Slideable
          key={width}
          width={width}
          itemsMargin={8}
          items={items.map(item => (
            <ListItem key={item}>{item}</ListItem>
          ))}
        />
      </div>
      <label>Swipeable looped 8 elements</label>
      <div className="listContainer">
        <Slideable
          looped
          swipeable
          key={width}
          width={width}
          itemsMargin={8}
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
          itemsMargin={8}
          items={items.slice(0, 1).map(item => (
            <ListItem key={item}>{item}</ListItem>
          ))}
        />
      </div>
      <WidthControl width={width} onWidthChanged={setWidth} />
    </div>
  );
};
