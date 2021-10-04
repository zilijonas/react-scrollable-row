import React from 'react';
import { Slideable } from 'react-slideable';
import 'react-slideable/dist/index.css';

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Box: React.FC = ({ children }) => (
  <div
    style={{
      width: '100%',
      height: 75,
      background: '#F002',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    }}
  >
    <span>{children}</span>
  </div>
);

export const App: React.FC = () => {
  return (
    <div
      style={{
        width: '100vw',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <div style={{ maxWidth: 500 }}>
        <Slideable
          items={items.map(item => (
            <Box key={item}>{item}</Box>
          ))}
        />
      </div>
    </div>
  );
};
