import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Loader = ({ onLoaded }) => {
  const [loadingText, setLoadingText] = useState("I'M");
  
  useEffect(() => {
    // Dot animation
    let dots = 0;
    const interval = setInterval(() => {
      dots = (dots + 1) % 4;
      setLoadingText("I'M" + ".".repeat(dots));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Preload videos
    const videosToLoad = ['/start_final.mp4', '/last_loop.mp4'];
    
    // We also want to ensure a minimum display time of 2.5 seconds so the loader doesn't just flash on fast connections
    const minTimePromise = new Promise(resolve => setTimeout(resolve, 2500));

    const loadPromises = videosToLoad.map(src => {
      return new Promise((resolve) => {
        const video = document.createElement('video');
        video.src = src;
        video.preload = 'auto';
        video.oncanplaythrough = () => resolve();
        video.onerror = () => resolve(); // continue even on error so it doesn't get stuck
        
        // Timeout just in case it takes too long to load or fails silently (e.g. mobile constraints)
        setTimeout(() => resolve(), 6000); 
      });
    });

    Promise.all([...loadPromises, minTimePromise]).then(() => {
      onLoaded();
    });

  }, [onLoaded]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[999] bg-stone-900 flex items-center justify-center"
    >
      <motion.h1 
        className="text-white font-bold text-5xl md:text-7xl tracking-tight"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {loadingText}
      </motion.h1>
    </motion.div>
  );
};

export default Loader;
