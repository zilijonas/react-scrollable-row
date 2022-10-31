# react-slideable

> A component for displaying data/image lists with dynamic items' width. Has an ability to create looped list.

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
import { Slideable, DisplayConfig } from 'react-slideable';
import 'react-slideable/dist/index.css';

const Example = () => (
  <Slideable
    // Array of your list items.
    // Items width must be set to `100%`.
    // Required.
    items={items.map(item => (
      <div key={item} style={{ width: '100%' }}>
        {item}
      </div>
    ))}
    // JSX Element to display for `finite` list
    // when items < number of displayed items by config.
    // Placeholder's width must be `100%`.
    // By default empty space is displayed.
    placeholderElement={<span style={{ width: '100%' }}>Placeholder</span>}
    // Type of the list. Available options: `finite` | `infinite`.
    // Default is `finite`.
    type="infinite"
    // Enables scroll by swipe.
    // Defaults to `false`.
    swipeable={true}
    // Height of the list.
    // Defaults to items height.
    height={200}
    // Width of the list.
    // Defaults to `100%`.
    width={500}
    // Enables scroll by swipe.
    // Defaults to `false`.
    swipeable={true}
    // Removes scroll buttons.
    // Defaults to `false`.
    noButtons={true}
    // Gap between list items.
    // Defaults to `0`.
    itemsGap={8}
    // You can set how many items will list display at given resolutions.
    // Defaults to the current value.
    displayConfig={{ 480: 2, 768: 3, 1200: 4, max: 5 }}
    // Style of the arrow buttons.
    buttonsStyle={{ background: '#777' }}
    // Custom button for scroll to left.
    customButtonLeft={<div>Scroll Left</div>}
    // Custom button for scroll to right.
    customButtonRight={<div>Scroll Right</div>}
  />
);
```

## License

MIT © [zilijonas](https://github.com/zilijonas)
