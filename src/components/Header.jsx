import { useState, useEffect } from 'react';
import { LuMenu, LuX } from 'react-icons/lu';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowHeight, setWindowHeight] = useState(800);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollY } = useScroll();

  // Smoothly interpolate all styles from scrollY 0 to windowHeight
  const headerBg = useTransform(scrollY, [0, windowHeight], ["rgba(236, 240, 241, 0)", "rgba(236, 240, 241, 0.9)"]);
  const backdropBlur = useTransform(scrollY, [0, windowHeight], ["blur(0px)", "blur(12px)"]);
  const shadow = useTransform(scrollY, [0, windowHeight], ["0px 0px 0px rgba(0,0,0,0)", "0px 1px 2px rgba(0,0,0,0.05)"]);
  const paddingVertical = useTransform(scrollY, [0, windowHeight], ["1.5rem", "1rem"]); // py-6 to py-4

  // Interpolate typography colors smoothly
  const colorMain = useTransform(scrollY, [0, windowHeight], ["#ECF0F1", "#2C3E50"]);
  const colorAccent = useTransform(scrollY, [0, windowHeight], ["#7F8C8D", "#34495E"]);
  const colorLink = useTransform(scrollY, [0, windowHeight], ["#ECF0F1", "#34495E"]);
  const colorLinkHover = useTransform(scrollY, [0, windowHeight], ["rgba(236, 240, 241, 0.6)", "#2C3E50"]);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        backgroundColor: headerBg,
        backdropFilter: backdropBlur,
        boxShadow: shadow,
        paddingTop: paddingVertical,
        paddingBottom: paddingVertical,
        "--color-main": colorMain,
        "--color-accent": colorAccent,
        "--color-link": colorLink,
        "--color-link-hover": colorLinkHover,
      }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold tracking-tight text-[var(--color-main)] transition-colors duration-0">
          Varun<span className="text-[var(--color-accent)] transition-colors duration-0">Vignesh</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-sm font-medium text-[var(--color-link)] hover:text-[var(--color-link-hover)] transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
          <a
            href="https://drive.google.com/file/d/1mWEvhW6Hd2uWGKsKYC0OT6ABra6k1Q1v/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-link)] hover:text-[var(--color-link-hover)] transition-colors duration-300"
          >
            Resume
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-[var(--color-main)] transition-colors duration-0"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <LuX size={24} /> : <LuMenu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#ECF0F1] border-b border-stone-200 overflow-hidden shadow-lg mt-4"
          >
            <nav className="flex flex-col py-4 px-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="text-[#2C3E50] font-medium text-lg hover:text-[#34495E]"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="https://drive.google.com/file/d/1mWEvhW6Hd2uWGKsKYC0OT6ABra6k1Q1v/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#2C3E50] font-medium text-lg hover:text-[#34495E]"
              >
                Resume
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
