import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data/skills';

const Skills = () => {
  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);
  const exactScroll1 = useRef(0);
  const exactScroll2 = useRef(0);
  const [speed, setSpeed] = useState(1); // Normal speed = 1, hover speed = 0.3

  // Duplicate skills to create seamless looping arrays
  const loopSkills = [...skills, ...skills, ...skills, ...skills];

  useEffect(() => {
    // Initialize exactScroll2 if it's 0 so it can scroll backwards
    if (scrollRef2.current && exactScroll2.current === 0) {
      exactScroll2.current = scrollRef2.current.scrollWidth / 4;
    }

    const intervalId = setInterval(() => {
      // Row 1 (Left to Right)
      if (scrollRef1.current) {
        exactScroll1.current += speed;
        const { scrollWidth } = scrollRef1.current;
        if (exactScroll1.current >= scrollWidth / 2) {
          exactScroll1.current -= scrollWidth / 4;
        }
        scrollRef1.current.scrollLeft = exactScroll1.current;
      }
      
      // Row 2 (Right to Left)
      if (scrollRef2.current) {
        exactScroll2.current -= speed;
        const { scrollWidth } = scrollRef2.current;
        if (exactScroll2.current <= 0) {
          exactScroll2.current += scrollWidth / 4;
        }
        scrollRef2.current.scrollLeft = exactScroll2.current;
      }
    }, 15);

    return () => clearInterval(intervalId);
  }, [speed]);

  return (
    <section id="skills" className="py-20 bg-[#ECF0F1] overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-4">Skills & Tools</h2>
          <div className="w-16 h-1 bg-[#34495E] mx-auto rounded-full mb-8"></div>
          <p className="text-[#7F8C8D] max-w-2xl mx-auto">
            The tools and technologies I use to build fast, scalable web applications.
          </p>
        </motion.div>
      </div>

      <div 
        className="relative w-full flex flex-col gap-6"
        onMouseEnter={() => setSpeed(0.2)}
        onMouseLeave={() => setSpeed(1)}
        onTouchStart={() => setSpeed(0.2)}
        onTouchEnd={() => setSpeed(1)}
      >
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#ECF0F1] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#ECF0F1] to-transparent z-10 pointer-events-none"></div>

        {/* First Row (Left to Right) */}
        <div 
          ref={scrollRef1}
          className="flex gap-6 px-4 overflow-x-hidden hide-scrollbar [&::-webkit-scrollbar]:hidden w-full"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {loopSkills.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <div
                key={index}
                className="w-64 h-24 shrink-0 bg-white px-6 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-stone-100 flex items-center justify-center gap-4 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] hover:border-[#34495E]/30 transition-all hover:-translate-y-1 group/card"
              >
                <div className="text-3xl text-[#7F8C8D] transition-colors group-hover/card:text-[#34495E]">
                  {IconComponent && <IconComponent />}
                </div>
                <span className="font-semibold text-[#2C3E50] text-lg">
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Second Row (Right to Left) */}
        <div 
          ref={scrollRef2}
          className="flex gap-6 px-4 overflow-x-hidden hide-scrollbar [&::-webkit-scrollbar]:hidden w-full"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {loopSkills.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <div
                key={index}
                className="w-64 h-24 shrink-0 bg-white px-6 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-stone-100 flex items-center justify-center gap-4 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] hover:border-[#34495E]/30 transition-all hover:-translate-y-1 group/card"
              >
                <div className="text-3xl text-[#7F8C8D] transition-colors group-hover/card:text-[#34495E]">
                  {IconComponent && <IconComponent />}
                </div>
                <span className="font-semibold text-[#2C3E50] text-lg">
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Skills;
