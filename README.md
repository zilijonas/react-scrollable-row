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

const SLIDEABLE_RES_CONFIG: ItemsPerResolutionConfig = {
  480: 2,
  768: 3,
  1200: 4,
  max: 5,
};

const Example: React.FC = () => {
  return (
    <Slideable
      looped={false} // Makes the list infinite by cloning the items of the list. Elements count must be bigger than the list is able to display with the given `itemsPerResolutionConfig`.
      placeholderElement={undefined} // JSX Element to display when `looped` is set to `false` and there are less items in the list than configuration lets list display.
      pixelsBetweenItems={8} // Margin between list items.
      buttonsStyle={{ background: '#000' }} // Style of the arrow buttons.
      itemsPerResolutionConfig={SLIDEABLE_RES_CONFIG} // You can set how many items will list display at given resolutions.
      items={items.map(item => (
        <div key={item} style={{ width: '100%' }}>
          {item}
        </div>
      ))} // Array of your list items. In order for dynamic items sizing to work, all items width must be set to `100%`.
    />
  );
};
```

## License

MIT © [zilijonas](https://github.com/zilijonas)
