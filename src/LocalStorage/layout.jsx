import { useEffect, useRef } from 'react';

function AppLayout({ children }) {
  const audioRef = useRef(null);

  useEffect(() => {
    const hasPlayed = sessionStorage.getItem('audioPlayed'); // Check if audio has played in this session

    if (!hasPlayed) {
      const audio = audioRef.current;

      const playAudio = async () => {
        try {
          await audio.play();
          sessionStorage.setItem('audioPlayed', 'true'); // Mark as played
        } catch (error) {
          console.log('Autoplay blocked, waiting for user interaction:', error);
          document.addEventListener('click', handleUserInteraction);
        }
      };

      const handleUserInteraction = () => {
        audio.play().catch((err) => console.log('Playback failed:', err));
        sessionStorage.setItem('audioPlayed', 'true'); // Mark as played after user interaction
      };

      playAudio();

      return () => {
        document.removeEventListener('click', handleUserInteraction);
      };
    }
  }, []);

  return (
    <>
      <audio ref={audioRef} src="/DeepIslam.mp3" preload="auto" />
      {children}
    </>
  );
}

export default AppLayout;
