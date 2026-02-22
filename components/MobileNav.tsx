'use client';

import { motion } from 'framer-motion';
import { navLinks, socialLinks } from '@/constants';
import Link from 'next/link';
import { useActiveContext } from '@/context/active-context';

const MobileNav = () => {
  const { hamburgerClicked, setHamburgerClicked } = useActiveContext();

  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 }
  };

  const closeMenu = () => setHamburgerClicked(false);

  return (
    <motion.div
      initial="closed"
      animate={hamburgerClicked ? "open" : "closed"}
      variants={menuVariants}
      className={`fixed inset-0 z-40 bg-[#0b0f19]/95 backdrop-blur-2xl flex flex-col justify-center items-center px-6 transition-all duration-300 ${hamburgerClicked ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-600/20 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-900/30 blur-[120px] rounded-full" />
      </div>

      <nav className="relative z-10 flex flex-col items-center gap-8 w-full max-w-sm">
        {navLinks.map((link, index) => (
          <motion.div key={index} variants={itemVariants} className="w-full text-center">
            <Link
              href={link.link}
              onClick={closeMenu}
              className="text-4xl xs:text-5xl font-lexend font-bold text-white hover:text-purple-400 transition-colors tracking-tight"
            >
              {link.name}
            </Link>
          </motion.div>
        ))}

        <motion.div variants={itemVariants} className="mt-8 w-full">
          <button
            onClick={() => { closeMenu(); window.location.href = '/calculator'; }}
            className="w-full py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold text-xl shadow-xl shadow-purple-500/20 active:scale-95 transition-all text-white"
          >
            Launch Swap App
          </button>
        </motion.div>

        <motion.div variants={itemVariants} className="flex gap-8 mt-12">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.link}
              target="_blank"
              rel="noreferrer"
              className="p-3 bg-white/5 rounded-full border border-white/10 hover:bg-purple-500/20 transition-all text-white/80 hover:text-white"
            >
              <div className="w-6 h-6">{link.icon}</div>
            </a>
          ))}
        </motion.div>
      </nav>
    </motion.div>
  );
};

export default MobileNav;
