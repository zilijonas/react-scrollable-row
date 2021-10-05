# react-slideable

> Netflix like slideable component for data/image lists.

[![NPM](https://img.shields.io/npm/v/react-slideable.svg)](https://www.npmjs.com/package/react-slideable) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Demo

[Demo](https://zilijonas.github.io/react-slideable/)

## Install

```bash
npm install --save react-slideable
```

## Usage

```tsx
import React, { Component } from 'react';
import { Slideable, ItemsPerResolutionConfig } from 'react-slideable';
import 'react-slideable/dist/index.css';

const DEFAULT_ITEMS_PER_RESOLUTION_CONFIG: ItemsPerResolutionConfig = {
  480: 2,
  900: 3,
  1500: 4,
  max: 5,
};

const Example: React.FC = () => {
  return (
    <Slideable
      looped={false} // Makes the list infinite by cloning the items of the list
      placeholderElement={undefined} // JSX Element to display when looped={false} and there are less items in the list than it is set to display
      pixelsBetweenItems={8} // Margin between items
      arrowsStyle={{ color: '#000' }} // Style of arrow buttons
      itemsPerResolutionConfig={DEFAULT_ITEMS_PER_RESOLUTION_CONFIG} // You can set how many items should the list on specific width show
      items={items.map(item => (
        <div key={item} style={{ width: '100%' }}>
          {item}
        </div>
      ))} // List of JSX elements. Since item's width is dynamic and calculated from the list's width, these JSX elements' width must be `100%`
    />
  );
};
```

## License

MIT © [zilijonas](https://github.com/zilijonas)
