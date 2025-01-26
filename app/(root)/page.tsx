'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, slideIn } from '@/utils/motion';
import Image from 'next/image';
import { Check, CornerDownRight } from 'lucide-react';
import { TitleText, TypingText } from '@/components/CustomTexts';
import MiningCards from '@/components/MiningCards';
import Footer from '@/components/Footer';
import DownloadSection from '@/components/DownloadSection';
import { useRouter } from 'next/navigation';
import MobileNav from '@/components/MobileNav';
import { useActiveContext } from '@/context/active-context';
import { cn } from '@/lib';

const Landing = () => {
  const router = useRouter();
  const { hamburgerClicked } = useActiveContext();

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const navigate = () => {
    router.push('/calculator');
    // router.push('/validate');
  };
  return (
    <motion.div
      variants={staggerContainer(0.1, 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className=" text-white text-4xl lg:text-6xl relative overflow-x-hidden "
    >
      <AnimatePresence>
        {hamburgerClicked && (
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
            className={cn(
              !hamburgerClicked ? 'easeOut' : '',
              'absolute top-0 z-50 w-full'
            )}
          >
            <MobileNav />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex flex-row lg:min-h-screen padding-x bg-banner bg-cover bg-no-repeat ">
        <div className="flex flex-col gap-3">
          <TitleText
            title="The First Digital Currency You Can Mine On Your Phone"
            textStyles="text-4xl w-[350px] sm:w-[600px] lg:w-[1300px] lg:text-6xl tracking-wide capitalize font-medium font-lexend pt-5 mt-[35px]"
          />
          <motion.p
            variants={slideIn('up', 'tween', 0.5, 0.75)}
            initial="hidden"
            whileInView="show"
            className="text-[18px] sm:text-[20px] font-work tracking-wide mt-[25px] sm:mt-[30px] leading-7 font-semibold"
          >
            Start mining Pi cryptocurrency today with our free, energy-light{' '}
            <br />
            mobile app!
          </motion.p>

          <button
            className=" flex flex-row items-center gap-5 border-2 border-yellow-400 rounded-md px-8 py-2 lg:py-5 lg:mt-5 font-bold text-yellow-400 hover:scale-110 active:scale-100 group hover:text-white transition-all duration-200 w-[fit-content] text-[18px]"
            onClick={navigate}
          >
            <TypingText
              title="Swap Your Pi to USDT"
              textStyles="text-yellow-400 hover:text-white font-work font-medium tracking-wide transition-all duration-200"
            />
            <Check
              color="yellow"
              className="w-5 h-5 group-hover:translate-x-1 transition-all"
            />
          </button>
        </div>

        <Image
          src="/pi_video-6.webp"
          alt="phone"
          width={500}
          height={500}
          className="hidden lg:flex absolute left-[1370px] z-50  -top-[60px] "
        />
      </div>

      {/* YouTube video embed */}
      <div className="video-container padding-x lg:hidden md:flex sm:flex mt-5">
        <iframe
          width="500"
          height="315"
          src="https://www.youtube.com/embed/MsOaC61cR3U"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/**Mining is Hard section */}
      <div className=" bg-purple-600 w-full">
        <div className="flex flex-col gap-3 padding-y items-center justify-center text-[20px] sm:text-[32px] font-semibold">
          <motion.p
            variants={slideIn('up', 'spring', 0.5, 0.75)}
            initial="hidden"
            whileInView="show"
            className="tracking-wide font-Azeret text-[14px] sm:text-[24px] font-semibold"
          >
            Mining crypto is hard
          </motion.p>
          <motion.p
            variants={slideIn('up', 'spring', 0.6, 0.75)}
            initial="hidden"
            whileInView="show"
            className="tracking-wide font-Azeret text-[14px] sm:text-[24px] font-semibold"
          >
            Investing crypto is risky
          </motion.p>

          <motion.p
            variants={slideIn('up', 'spring', 0.7, 0.75)}
            initial="hidden"
            whileInView="show"
            className="tracking-wide font-Azeret text-[14px] sm:text-[24px] font-semibold"
          >
            Too many of us are left out of <br /> the cryptocurrency revolution
          </motion.p>
        </div>
      </div>
      <div className=" bg-purple-400 w-full h-3"></div>
      <div className=" bg-purple-300 w-full h-3"></div>
      <div className=" bg-purple-200 w-full h-3"></div>

      {/**Mining Easy Section */}
      <section className="padding-x lg:px-[450px] bg-white items-center ">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-5">
          <Image
            src="/MiningEasy.png"
            alt="mining_easy"
            width={400}
            height={400}
          />
          <div className="flex flex-col gap-5">
            <h3 className=" text-4xl lg:text-5xl font-lexend font-bold  text-purple-600 tracking-wide">
              Pi makes crypto <br className="hidden lg:block" /> mining easy.
            </h3>
            <p className=" text-gray-700 text-[18px] lg:text-[20px] font-semibold font-work leading-7">
              Breakthrough tech allows you to mine Pi on your phone without{' '}
              <br className="hidden md:block lg:hidden" />
              draining your battery.
            </p>
            <a
              href="https://minepi.com/white-paper/"
              target="_blank"
              className=" flex flex-row items-center gap-5 border-2 bg-purple-600 shadow-sm rounded-md px-8 py-2 lg:py-5 lg:mt-3 font-bold hover:scale-110 active:scale-100 group hover:text-white transition-all duration-200 w-[fit-content] text-[18px] "
            >
              <TypingText
                title="Learn the tech behind pi"
                textStyles="text-white hover:text-white font-work font-medium tracking-wide transition-all duration-200 capitalize"
              />
              <CornerDownRight
                color="white"
                className="w-5 h-5 group-hover:translate-x-1 transition-all"
              />
            </a>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center  md:px-[200px] lg:px-0 lg:flex-row gap-5 mt-[100px] pb-5">
          <MiningCards
            index={1 as number}
            icon="/Spinner.png"
            title="Decentralized"
            description="Secure, Immutable & Interoperable"
          />
          <MiningCards
            index={2 as number}
            icon="/iPhone.png"
            title="Mobile First"
            description="Not battery intensive"
          />
          <MiningCards
            index={3 as number}
            icon="/Internet.png"
            title="User & Planet Friendly"
            description="Easy to use, scale & eco-friendly "
          />
        </div>
      </section>

      {/**Download section */}
      <DownloadSection />

      {/**Footer */}
      <Footer />
    </motion.div>
  );
};
export default Landing;
