import React from 'react';

const Copyright: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="text-center py-4 text-gray-500">
      © {currentYear}, Regan Maharjan. All rights reserved.
    </div>
  );
};

export default Copyright;