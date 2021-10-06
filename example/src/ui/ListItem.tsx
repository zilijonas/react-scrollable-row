import React from 'react';

interface Props {}

export const ListItem: React.FC<Props> = ({ children }) => {
  return (
    <div className="listItem">
      <span>{children}</span>
    </div>
  );
};
