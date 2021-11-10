import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const LazyApp = React.lazy(() => import('./App').then(module => ({ default: module.App })));

ReactDOM.render(
  <React.Suspense fallback={<div>Loading...</div>}>
    <LazyApp />
  </React.Suspense>,
  document.getElementById('root'),
);
