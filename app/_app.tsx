// pages/_app.tsx
import type { AppProps } from 'next/app';
import { useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <>
      <audio src="/sounds/calmmountain.mp3" autoPlay loop muted={!isPlaying} />
      {!isPlaying && <button onClick={handlePlay}>Play</button>}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;