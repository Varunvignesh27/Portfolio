import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LuGithub, LuExternalLink, LuFolder, LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { projects } from '../data/projects';

const Projects = () => {
  const scrollRef = useRef(null);
  const exactScroll = useRef(0);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(1);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (isPaused) return;

    const intervalId = setInterval(() => {
      if (scrollRef.current) {
        // Sync exactScroll with native manual scroll if user swiped
        if (Math.abs(scrollRef.current.scrollLeft - exactScroll.current) > 2) {
          exactScroll.current = scrollRef.current.scrollLeft;
        }

        exactScroll.current += speed;
        
        const { scrollWidth, clientWidth } = scrollRef.current;
        // When we reach the end, jump back to the start
        if (Math.ceil(exactScroll.current + clientWidth) >= scrollWidth) {
          exactScroll.current = 0;
        }
        scrollRef.current.scrollLeft = exactScroll.current;
      }
    }, 15); // Consistent speed across all refresh rates

    return () => clearInterval(intervalId);
  }, [isPaused, speed]);

  const manualScroll = (direction) => {
    if (scrollRef.current) {
      setIsPaused(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 1.5 : scrollLeft + clientWidth / 1.5;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });

      // Resume auto-scroll after the smooth animation finishes
      timeoutRef.current = setTimeout(() => {
        setIsPaused(false);
      }, 800);
    }
  };

  return (
    <section id="projects" className="py-20 bg-white relative">
      <div className="container mx-auto px-6 md:px-12 mb-12 flex justify-between items-end">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-4">Featured Projects</h2>
          <div className="w-16 h-1 bg-[#34495E] rounded-full"></div>
        </motion.div>
        
        {/* Navigation Arrows */}
        <div className="hidden md:flex gap-4">
          <button 
            onClick={() => manualScroll('left')}
            className="p-3 rounded-full bg-stone-100 text-[#2C3E50] hover:bg-[#34495E] hover:text-white transition-all shadow-sm"
          >
            <LuChevronLeft size={24} />
          </button>
          <button 
            onClick={() => manualScroll('right')}
            className="p-3 rounded-full bg-stone-100 text-[#2C3E50] hover:bg-[#34495E] hover:text-white transition-all shadow-sm"
          >
            <LuChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="relative w-full">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div 
          ref={scrollRef}
          onMouseEnter={() => setSpeed(0.2)}
          onMouseLeave={() => setSpeed(1)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex gap-8 px-8 md:px-32 overflow-x-auto pb-8 hide-scrollbar [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="w-80 md:w-[480px] min-h-[320px] shrink-0 bg-white rounded-3xl p-8 flex flex-col justify-between shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-stone-100 hover:shadow-xl transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[#2C3E50] font-bold text-2xl">{project.title}</h3>
                  <LuFolder className="text-[#34495E]/50" size={24} />
                </div>
                
                <p className="text-[#7F8C8D] text-base md:text-lg leading-relaxed mb-8 line-clamp-4">
                  {project.description}
                </p>
              </div>
              
              <div className="flex items-end justify-between mt-auto pt-6 border-t border-stone-100">
                <div className="flex-1 pr-4">
                  <p className="text-[#34495E] font-medium text-xs md:text-sm">{project.techStack.join(' • ')}</p>
                </div>
                
                <div className="flex gap-2 shrink-0">
                  {project.githubLink && project.githubLink !== "" && project.githubLink !== "#" && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center bg-stone-50 text-[#34495E] hover:bg-[#34495E] hover:text-white transition-all hover:scale-110 shadow-sm">
                      <LuGithub size={18} />
                    </a>
                  )}
                  {project.livelink && project.livelink !== "" && project.livelink !== "#" && (
                    <a href={project.livelink} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center bg-stone-50 text-[#34495E] hover:bg-[#34495E] hover:text-white transition-all hover:scale-110 shadow-sm">
                      <LuExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
