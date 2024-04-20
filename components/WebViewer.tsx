// components/WebViewer.tsx
import React from 'react';

interface WebViewerProps {
  src: string;
}

const WebViewer: React.FC<WebViewerProps> = ({ src }) => {
  return (
    <iframe 
      width="100%" 
      height="500" 
      src={src} 
      title="Web Viewer" 
      frameBorder="0" 
      allowFullScreen
    ></iframe>
  );
};

export default WebViewer;