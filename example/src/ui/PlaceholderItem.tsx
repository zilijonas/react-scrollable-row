import React from 'react';

interface Props {}

export const PlaceholderItem: React.FC<Props> = () => {
  return (
    <div className="placeholderItem">
      <span>?</span>
    </div>
  );
};
