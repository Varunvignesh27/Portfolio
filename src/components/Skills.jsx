import { motion } from 'framer-motion';
import { skills } from '../data/skills';

const Skills = () => {
  // Duplicate skills to create seamless looping marquees
  const loopSkills = [...skills, ...skills, ...skills, ...skills];

  // Split skills to have two distinct rows if desired, or just use the same array but different animation direction.
  const firstRow = loopSkills.slice(0, Math.floor(loopSkills.length / 2));
  const secondRow = loopSkills.slice(Math.floor(loopSkills.length / 2));

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

      <div className="relative w-full flex flex-col gap-6 group">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#ECF0F1] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#ECF0F1] to-transparent z-10 pointer-events-none"></div>

        {/* First Row (Left to Right) */}
        <div className="flex w-max">
          <div className="flex animate-marquee-reverse group-hover:pause gap-6 px-4">
            {loopSkills.map((skill, index) => {
              const IconComponent = skill.icon;
              return (
                <div
                  key={index}
                  className="w-64 h-24 shrink-0 bg-white px-6 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-stone-100 flex items-center justify-center gap-4 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] hover:border-[#34495E]/30 transition-all hover:-translate-y-1"
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

        {/* Second Row (Right to Left) */}
        <div className="flex w-max">
          <div className="flex animate-marquee group-hover:pause gap-6 px-4">
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

      </div>
    </section>
  );
};

export default Skills;
