import { motion } from 'framer-motion';
import { LuGithub, LuLinkedin, LuMail, LuInstagram, LuLoader, LuCheck } from 'react-icons/lu';
import { useForm, ValidationError } from '@formspree/react';

const Footer = () => {
  const formspreeId = import.meta.env.VITE_FORMSPREE_ID || 'moeavvry';
  const [state, handleSubmit] = useForm(formspreeId);

  return (
    <footer id="contact" className="bg-[#2C3E50] text-white pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between gap-16 mb-16">

          {/* Text content */}
          <div className="md:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Work Together</h2>
              <p className="text-[#ECF0F1]/80 text-lg mb-8 max-w-md">
                I'm currently available for freelance projects.
                If you have a project that needs some creative touch, I'd love to hear about it.
                <br /><br />
                Reach me directly at: <span className="text-white font-medium">varunvignesh006@gmail.com</span>
              </p>

              <div className="flex gap-4">
                <a href="https://github.com/Varunvignesh27" target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-full hover:bg-[#34495E] hover:-translate-y-1 hover:text-white transition-all text-[#2C3E50] shadow-md">
                  <LuGithub size={20} />
                </a>
                <a href="https://www.linkedin.com/in/varunvignesh" target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-full hover:bg-[#34495E] hover:-translate-y-1 hover:text-white transition-all text-[#2C3E50] shadow-md">
                  <LuLinkedin size={20} />
                </a>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=varunvignesh006@gmail.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-full hover:bg-[#34495E] hover:-translate-y-1 hover:text-white transition-all text-[#2C3E50] shadow-md">
                  <LuMail size={20} />
                </a>
                <a href="https://www.instagram.com/ivarunvignesh?igsh=enBkNWh3aTczZXFt" target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-full hover:bg-[#34495E] hover:-translate-y-1 hover:text-white transition-all text-[#2C3E50] shadow-md">
                  <LuInstagram size={20} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <div className="md:w-1/2 max-w-md">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="bg-white p-8 rounded-3xl shadow-xl text-[#2C3E50]"
            >
              {state.succeeded ? (
                <div className="flex flex-col items-center justify-center py-12 text-center h-full">
                  <LuCheck size={48} className="text-[#34495E] mb-4" />
                  <h3 className="text-2xl font-bold mb-2 text-[#2C3E50]">Thanks for joining!</h3>
                  <p className="text-[#7F8C8D]">I'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="sr-only">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Your Name"
                      className="w-full bg-[#ECF0F1] border border-transparent rounded-xl px-4 py-3 text-[#2C3E50] placeholder-[#7F8C8D] focus:outline-none focus:border-[#34495E] focus:ring-1 focus:ring-[#34495E] transition-all"
                    />
                    <ValidationError
                      prefix="Name"
                      field="name"
                      errors={state.errors}
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="Your Email Address"
                      className="w-full bg-[#ECF0F1] border border-transparent rounded-xl px-4 py-3 text-[#2C3E50] placeholder-[#7F8C8D] focus:outline-none focus:border-[#34495E] focus:ring-1 focus:ring-[#34495E] transition-all"
                    />
                    <ValidationError
                      prefix="Email"
                      field="email"
                      errors={state.errors}
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="sr-only">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows="4"
                      placeholder="How can I help you?"
                      className="w-full bg-[#ECF0F1] border border-transparent rounded-xl px-4 py-3 text-[#2C3E50] placeholder-[#7F8C8D] focus:outline-none focus:border-[#34495E] focus:ring-1 focus:ring-[#34495E] transition-all resize-none"
                    ></textarea>
                    <ValidationError
                      prefix="Message"
                      field="message"
                      errors={state.errors}
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {state.errors && state.errors.length > 0 && (
                    <p className="text-red-500 text-sm font-medium">Something went wrong. Please check the fields.</p>
                  )}

                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="w-full bg-[#34495E] hover:bg-[#2C3E50] text-white font-medium py-3 px-4 rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {state.submitting ? (
                      <>
                        <LuLoader size={20} className="animate-spin" /> Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>

        {/* Footer line */}
        <div className="border-t border-[#34495E] pt-8 flex justify-center items-center text-[#ECF0F1]/60 text-sm">
          <p>let's build something great together.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
