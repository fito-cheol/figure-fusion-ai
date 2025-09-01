
import React, { useState } from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [show, setShow] = useState(false);

  if (!text) {
    return <>{children}</>;
  }

  return (
    <div className="relative inline-block" 
         onMouseEnter={() => setShow(true)} 
         onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div 
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs px-3 py-2 text-sm font-medium text-white bg-gray-900/80 backdrop-blur-sm rounded-lg shadow-lg z-10 transition-opacity"
          role="tooltip"
        >
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900/80" aria-hidden="true"></div>
        </div>
      )}
    </div>
  );
};
