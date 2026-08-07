import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { roles } from '../data/roles';
import { LuChevronDown } from 'react-icons/lu';

const About = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [introFinished, setIntroFinished] = useState(false);
  const loopVideoRef = useRef(null);

  const handleIntroEnded = () => {
    setIntroFinished(true);
    if (loopVideoRef.current) {
      loopVideoRef.current.play();
    }
  };

  // Role cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background Videos */}
      <div className="absolute inset-0 z-0 bg-stone-900">
        <video
          ref={loopVideoRef}
          loop
          muted
          playsInline
          className="w-full h-full object-cover absolute inset-0"
        >
          <source src="/last_loop.mp4" type="video/mp4" />
        </video>

        {!introFinished && (
          <video
            autoPlay
            muted
            playsInline
            onEnded={handleIntroEnded}
            className="w-full h-full object-cover absolute inset-0 z-10"
          >
            <source src="/start_final.mp4" type="video/mp4" />
          </video>
        )}

        {/* Subtle dark overlay gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/85 via-stone-900/50 to-transparent z-20 pointer-events-none"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-30 flex flex-col md:flex-row items-center h-full pt-4">

        {/* Left Column - Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 w-full max-w-2xl"
        >
          <div className="space-y-6">
            <h2 className="text-white/80 font-medium tracking-[0.2em] uppercase text-sm flex items-center gap-2">
              HI, I'M
            </h2>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight drop-shadow-md">
              VARUN <span className="text-stone-300">VIGNESH</span>
            </h1>

            <div className="h-10 overflow-hidden flex items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentRole}
                  initial={{ opacity: 0, y: 20, rotateX: 90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -20, rotateX: -90 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="inline-block text-xl md:text-2xl text-white font-semibold tracking-wide drop-shadow-md"
                  style={{ transformOrigin: "bottom" }}
                >
                  {roles[currentRole]}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="w-16 h-1 bg-stone-300 rounded-full my-6"></div>

            <p className="text-lg text-stone-200 leading-relaxed font-light">
              I build things with code. Turning ideas into real websites and applications, from how they look to how they work behind the scenes. I enjoy solving problems, whether it's a personal project or freelance work. I'm always eager to learn something new and take on the next challenge.
            </p>
          </div>

          {/* Scroll Down Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="pt-12"
          >
            <a href="#skills" className="text-white/60 flex flex-col items-center md:items-start w-fit text-sm font-medium hover:text-white transition-colors group">
              <span>Scroll Down</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="mt-2 text-white group-hover:scale-110 transition-transform"
              >
                <LuChevronDown size={24} />
              </motion.div>
            </a>
          </motion.div>
        </motion.div>

        {/* Right side is intentionally empty so the video subject is visible */}
        <div className="flex-1 hidden md:block"></div>

      </div>
    </section>
  );
};

export default About;
