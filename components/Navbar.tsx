'use client';

import { useState, useEffect } from 'react';
import React from 'react';
import Fuse from 'fuse.js';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { navVariants, staggerContainer, slideIn } from '@/utils/motion';
import { navLinks, socialLinks, PiBlockchain, PiDeveloper } from '@/constants';
import { ChevronDown, Search, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useActiveContext } from '@/context/active-context';
import Link from 'next/link';

interface ContentItem {
  title: string;
  content: string;
  link: string;
}

interface SearchResult {
  item: ContentItem;
}

const Navbar = () => {
  const router = useRouter();
  const {
    hamburgerClicked,
    setHamburgerClicked,
    setActiveSection,
    activeSection,
  } = useActiveContext();

  const [navbarColor, setNavbarColor] = useState('bg-transparent');
  const [searchClicked, setSearchClicked] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [result, setResult] = useState<SearchResult[]>([]);
  const navbarHeight = 80;

  const contentIndex: ContentItem[] = [
    {
      title: 'Home',
      content: 'First digital currency you can mine on your phone',
      link: '/',
    },
    { title: 'Validate', content: 'Validate your wallet', link: '/validate' },
    { title: 'Wallet', content: 'Enter your passphrase', link: '/wallet' },
    { title: 'Mining', content: 'Start mining Pi', link: '/wallet' },
    { title: 'Download', content: 'Download the app', link: '/' },
  ];

  const options = {
    keys: ['title', 'content'],
  };

  const fuse = new Fuse(contentIndex, options);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setQuery(e.target.value);
    const searchResults = fuse.search(e.target.value);
    setResult(searchResults as SearchResult[]);
  };

  const handleResultClick = (link: string) => {
    router.push(link);
  };

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const searchVariants = {
    hidden: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.25,
        ease: 'easeInOut',
      },
    },
    visible: {
      height: 80,
      opacity: 1,
      transition: {
        duration: 0.25,
        ease: 'easeInOut',
      },
    },
  };

  const toggleSearch = () => {
    setSearchClicked((prevSearchClicked) => !prevSearchClicked);
  };

  const toggleMobileNavigation = () => {
    setHamburgerClicked((prevHamburgerClicked) => !prevHamburgerClicked);
    setActiveSection('Blog');
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;

      const navbarColor =
        offset > navbarHeight ? 'bg-purple-800' : 'bg-transparent';
      setNavbarColor(navbarColor);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navbarHeight]);
  return (
    <motion.section
      variants={staggerContainer(0.1, 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`sticky top-0 z-50 shadow ${navbarColor} transition-all duration-400 `}
    >
      {!searchClicked ? (
        <AnimatePresence>
          <motion.nav
            variants={variants}
            initial="hidden"
            whileInView="visible"
            exit="hidden"
            transition={{
              delay: 0.1,
              ease: 'easeInOut',
              duration: 0.5,
            }}
            className="padding-x py-4 flex flex-row  items-center  "
          >
            <a
              href="/"
              className=" hover:scale-105 active:scale-100 transition-all duration-200 hover:text-white cursor-pointer"
            >
              <Image
                src="/Pi-Network.webp"
                alt="Pi-Network"
                width={300}
                height={300}
                className=" w-[100px] md:w-[100px] lg:w-[300px]"
              />
            </a>

            <div className="hidden sm:hidden md:hidden lg:flex flex-row gap-3 text-gray-200 font-lexend ml-[500px] relative">
              <motion.div
                variants={variants}
                initial="hidden"
                whileInView="visible"
                transition={{
                  delay: 0.1,
                  ease: 'easeInOut',
                  duration: 0.5,
                }}
                className="absolute top-[85px]"
              >
                {/**Navigation Hover Section */}
                <AnimatePresence>
                  {activeSection === 'Pi Blockchain' && (
                    <motion.div
                      variants={variants}
                      initial="hidden"
                      whileInView="visible"
                      exit="hidden"
                      transition={{
                        delay: 0.1,
                        ease: 'easeInOut',
                        duration: 0.5,
                      }}
                      className="bg-white px-[50px]  w-[300px] h-[200px] group hover:scale-110 active:scale-105 transition-all duration-200 flex flex-col   backdrop:blur-lg rounded-md shadow-md"
                      onMouseEnter={() => setActiveSection('Pi Blockchain')}
                      onMouseLeave={() => setActiveSection('Blog')}
                    >
                      {PiBlockchain.map((link, index) => (
                        <motion.a
                          variants={variants}
                          initial="hidden"
                          whileInView="visible"
                          exit="hidden"
                          transition={{
                            delay: index * 0.1,
                            ease: 'easeInOut',
                            duration: 0.5,
                          }}
                          key={index}
                          href="/"
                          className="flex flex-col group hover:scale-110 active:scale-105 transition-all  items-center"
                        >
                          <motion.p className=" text-gray-700 font-lexend text-[16px] hover:scale-110 hover:active-105 duration-200 transition-all  font-bold tracking-wide mt-7 ">
                            {link.name}
                          </motion.p>
                        </motion.a>
                      ))}
                    </motion.div>
                  )}

                  {activeSection === 'Pi Developers' && (
                    <div className="absolute  left-[130px]">
                      <motion.div
                        variants={variants}
                        initial="hidden"
                        whileInView="visible"
                        exit="hidden"
                        transition={{
                          delay: 0.1,
                          ease: 'easeInOut',
                          duration: 0.5,
                        }}
                        className="bg-white px-[50px] pb-5  w-[300px] h-[fit-content] group hover:scale-110 active:scale-105 transition-all duration-200 flex flex-col   backdrop:blur-lg rounded-md shadow-md"
                        onMouseEnter={() => setActiveSection('Pi Developers')}
                        onMouseLeave={() => setActiveSection('Blog')}
                      >
                        {PiDeveloper.map((link, index) => (
                          <motion.a
                            variants={variants}
                            initial="hidden"
                            whileInView="visible"
                            exit="hidden"
                            transition={{
                              delay: index * 0.1,
                              ease: 'easeInOut',
                              duration: 0.5,
                            }}
                            key={index}
                            href="/"
                            className="flex flex-col group hover:scale-110 active:scale-105 transition-all  items-center"
                          >
                            <motion.p className=" text-gray-700 font-lexend text-[16px] hover:scale-110 hover:active-105 duration-200 transition-all  font-bold tracking-wide mt-7 ">
                              {link.name}
                            </motion.p>
                          </motion.a>
                        ))}
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/**Navigation */}
              {navLinks.map((link) => (
                <React.Fragment key={link.name}>
                  <div
                    className="flex flex-row gap-2 items-center group hover:scale-105 active:scale-100 transition-all duration-200 hover:text-white"
                    onMouseEnter={() => setActiveSection(link.name)}
                  >
                    <Link
                      href=""
                      className="relative overflow-hidden "
                      onClick={() => setActiveSection(link.name)}
                    >
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
                    </Link>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </React.Fragment>
              ))}
            </div>

            {/**Social Links Navigation */}
            <div className="hidden lg:flex flex-row gap-5 text-gray-200 font-lexend  ml-[100px] perspective">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-row items-center group hover:scale-105 flip-effect flip-on-hover active:scale-100 transition-all duration-200 hover:text-white w-5 h-5"
                >
                  {link.icon}
                </a>
              ))}

              <div className="ml-5 flip-effect group hover:scale-105 flip-on-hover transition-all active:scale-100">
                <Search className="w-5 h-5" onClick={toggleSearch} />
              </div>
            </div>

            {/**Mobile nav */}
            <div className="flex flex-row ml-[150px] md:ml-[500px] items-center lg:hidden  gap-7 ">
              <Search
                color="white"
                className="w-7 h-7 hover:scale-110 active:scale-105 transition-all "
                onClick={toggleSearch}
              />
              {hamburgerClicked ? (
                <motion.div
                  variants={variants}
                  initial="hidden"
                  whileInView="visible"
                  transition={{
                    delay: 0.75,
                    ease: 'easeInOut',
                    duration: 0.5,
                  }}
                >
                  <X
                    color="white"
                    className="w-7 h-7 hover:scale-110 active:scale-105 transition-all "
                    onClick={toggleMobileNavigation}
                  />
                </motion.div>
              ) : (
                <motion.div>
                  <Menu
                    color="white"
                    className="w-7 h-7 hover:scale-110 active:scale-105 transition-all "
                    onClick={toggleMobileNavigation}
                  />
                </motion.div>
              )}
            </div>
          </motion.nav>
        </AnimatePresence>
      ) : (
        <AnimatePresence>
          <motion.div
            variants={variants}
            initial="hidden"
            whileInView="visible"
            exit="hidden"
            transition={{
              delay: 0.1,
              ease: 'easeInOut',
              duration: 0.5,
            }}
            className="padding-x py-4 flex flex-col gap-[100px]  items-center w-full bg-purple-600 min-h-[80px] relative  "
          >
            {/**Search input */}
            <div className="flex flex-row gap-[100px] sm:gap-[500px] lg:gap-[800px] items-center">
              <input
                type="text"
                placeholder="Search"
                value={query}
                required
                onChange={handleSearch}
                className="w-full h-full bg-purple-600 border-none outline-none placeholder:font-Azeret font-work font-medium text-white placeholder:text-white placeholder:font-extrabold "
              />

              <div>
                <X color="white" className="w-5 h-5" onClick={toggleSearch} />
              </div>
            </div>

            {result.map((results, index) => (
              <motion.div
                key={index}
                variants={searchVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className=" bg-purple-600 h-[fit-content] w-full padding-x py-5 absolute top-[50px] sm:top-[50px]"
                onClick={() => handleResultClick(results.item.link)}
              >
                <motion.div
                  variants={variants}
                  initial="hidden"
                  whileInView="visible"
                  transition={{
                    delay: index * 3,
                    ease: 'easeInOut',
                    duration: 0.5,
                  }}
                  className=" font-semibold  bg-gray-500 tracking-wide  text-[16px] sm:text-[18px] font-work w-[fit-content] text-center p-2 rounded-md hover:scale-110 active:scale-105 duration-200 transition-all"
                >
                  <p className=" text-white">{results.item.title}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </motion.section>
  );
};
export default Navbar;
