'use client';

import { motion } from 'framer-motion';
import { navLinks, PiBlockchain, PiDeveloper, socialLinks } from '@/constants';
import { staggerContainer, slideIn } from '@/utils/motion';
import Link from 'next/link';
import { useActiveContext } from '@/context/active-context';

const MobileNav = () => {
  const { activeSection, setActiveSection } = useActiveContext();

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.section
      variants={staggerContainer(0.1, 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="flex justify-center min-h-[4000px] bg-[#1D0630] bg-banner bg-cover padding-x opacity-95 backdrop:blur-md w-full"
    >
      {activeSection === 'Pi Blockchain' && (
        <motion.div
          variants={variants}
          initial="hidden"
          whileInView="visible"
          transition={{
            delay: 0.1,
            ease: 'easeInOut',
            duration: 0.5,
          }}
          className="flex flex-col items-center justify-center fixed z-50 top-[250px] "
        >
          <button
            className=" font-lexend font-extrabold text-white text-[20px] mb-5"
            onClick={() => setActiveSection('Blog')}
          >
            Back
          </button>
          {PiBlockchain.map((link, index) => (
            <Link
              href="/"
              key={index}
              className="font-lexend font-extrabold text-white text-[30px] gap-7 "
            >
              <p className="hover:scale-110 active:scale-105 duration-200 transition-all mt-3">
                {link.name}
              </p>
            </Link>
          ))}
        </motion.div>
      )}

      {activeSection === 'Pi Developers' && (
        <motion.div
          variants={variants}
          initial="hidden"
          whileInView="visible"
          transition={{
            delay: 0.1,
            ease: 'easeInOut',
            duration: 0.5,
          }}
          className="flex flex-col items-center justify-center fixed z-50 top-[250px] "
        >
          <button
            className=" font-lexend font-extrabold text-white text-[20px] mb-5"
            onClick={() => setActiveSection('Blog')}
          >
            Back
          </button>
          {PiDeveloper.map((link, index) => (
            <Link
              href="/"
              key={index}
              className="font-lexend font-extrabold text-white text-[30px] gap-7 "
            >
              <p className="hover:scale-110 active:scale-105 duration-200 transition-all mt-3">
                {link.name}
              </p>
            </Link>
          ))}
        </motion.div>
      )}

      {(activeSection === 'Blog' ||
        activeSection === 'About Us' ||
        activeSection === 'Support') && (
        <motion.div
          variants={variants}
          initial="hidden"
          whileInView="visible"
          transition={{
            delay: 0.1,
            ease: 'easeInOut',
            duration: 0.5,
          }}
          className="flex flex-col items-center justify-center fixed z-50 top-[250px] "
        >
          {navLinks.map((link, index) => (
            <Link
              href="/"
              key={index}
              className="font-lexend font-extrabold text-white text-[30px] gap-[25px] hover:scale-110 active:scale-105 duration-200 transition-all"
              onClick={() => setActiveSection(link.name)}
            >
              <p className="hover:scale-110 active:scale-105 duration-200 transition-all mt-3">
                {link.name}
              </p>
            </Link>
          ))}

          <div className=" flex flex-row gap-5 mt-[100px] items-center">
            {socialLinks.map((link, index) => (
              <motion.a
                variants={slideIn('left', 'spring', index * 0.25, 0.75)}
                initial="hidden"
                whileInView={`show`}
                href={link.link}
                key={index}
                target="_blank"
                className=" hover:scale-110 active:scale-105 duration-200 transition-all"
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.section>
  );
};
export default MobileNav;
