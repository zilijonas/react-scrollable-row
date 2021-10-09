# react-slideable

> Component for displaying data/image lists with dynamic items' width. Has an ability to create looped list.

[![NPM](https://img.shields.io/npm/v/react-slideable.svg)](https://www.npmjs.com/package/react-slideable) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Demo

![@zilijonas/react-slideable horizontal](https://github.com/zilijonas/react-slideable/blob/master/slideable-demo.gif?raw=true)

[Demo](https://zilijonas.github.io/react-slideable/)

## Install

```bash
npm install --save react-slideable
```

or

```bash
yarn add react-slideable
```

## Usage

```tsx
import React, { Component } from 'react';
import { Slideable, ItemsPerScrollWidthConfig } from 'react-slideable';
import 'react-slideable/dist/index.css';

const CONFIG: ItemsPerScrollWidthConfig = {
  480: 2,
  768: 3,
  1200: 4,
  max: 5,
};

const Example: React.FC = () => {
  return (
    <Slideable
      // Height of the list. Defaults to `auto`.
      height={200}
      // Width of the list. Defaults to `100%`.
      width={500}
      // Makes the list infinite by cloning the items of the list. Defaults to `false`.
      looped={true}
      // Margin between list items.
      marginBetweenItems={8}
      // You can set how many items will list display at given resolutions.
      itemsPerScrollWidth={CONFIG}
      // Style of the arrow buttons.
      buttonsStyle={{ background: '#777' }}
      // JSX Element to display when `looped` is set to `false` and there are less items in the list than in the configuration for the current scroll width.
      // In order for dynamic items sizing to work, placeholder's width must be `100%`.
      placeholderElement={<span style={{ width: '100%' }}>Placeholder</span>}
      // Array of your list items. In order for dynamic items sizing to work, all items width must be set to `100%`.
      items={items.map(item => (
        <div key={item} style={{ width: '100%' }}>
          {item}
        </div>
      ))}
    />
  );
};
```

## License

MIT © [zilijonas](https://github.com/zilijonas)
