import { motion } from 'framer-motion';
import { LuGithub, LuExternalLink, LuFolder } from 'react-icons/lu';
import { projects } from '../data/projects';

const Projects = () => {
  // Duplicate projects to create a seamless looping marquee
  const loopProjects = [...projects, ...projects, ...projects];

  return (
    <section id="projects" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-4">Featured Projects</h2>
          <div className="w-16 h-1 bg-[#34495E] rounded-full"></div>
        </motion.div>
      </div>

      <div className="relative w-full">
        {/* Gradient Masks for smooth fade on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        {/* Marquee Container */}
        <div className="flex group w-max">
          <div className="flex animate-marquee group-hover:pause gap-8 px-4">
            {loopProjects.map((project, index) => (
              <div 
                key={index} 
                className="w-80 md:w-[480px] min-h-[320px] shrink-0 bg-white rounded-3xl p-8 flex flex-col justify-between shadow-lg border border-stone-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group/card"
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
      </div>
    </section>
  );
};

export default Projects;
