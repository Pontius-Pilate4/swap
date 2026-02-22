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
      <div className="flex flex-col lg:flex-row min-h-screen padding-x relative z-10 items-center lg:items-center pt-28 lg:pt-0 max-w-full overflow-x-hidden">
        <div className="flex flex-col gap-6 lg:w-1/2 z-20 text-center lg:text-left items-center lg:items-start w-full max-w-full overflow-hidden">
          <motion.div
            variants={slideIn('up', 'tween', 0.2, 0.75)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/30 border border-purple-500/20 w-fit mx-auto lg:mx-0"
          >
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-xs xs:text-sm font-medium text-purple-200">The Future of Mobile Mining</span>
          </motion.div>

          <TitleText
            title="Unlock The Value Of Your Pi"
            textStyles="text-2xl xs:text-3xl sm:text-7xl lg:text-8xl tracking-tight leading-[1.05] font-bold font-lexend bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-yellow-300 max-w-full text-balance w-full break-normal whitespace-normal"
          />

          <motion.p
            variants={slideIn('up', 'tween', 0.5, 0.75)}
            initial="hidden"
            whileInView="show"
            className="text-balance text-xs xs:text-base sm:text-lg lg:text-xl text-gray-300 font-work tracking-wide mt-2 leading-relaxed max-w-2xl px-2 lg:px-0 w-full"
          >
            While centralized exchanges trade on volatility, our DEX trades on Consensus. We support the GCV $314.159 standard, empowering Pioneers to realize the true utility value of their mining efforts.
          </motion.p>

          <motion.button
            variants={slideIn('up', 'spring', 0.8, 0.75)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 flex flex-row justify-center items-center gap-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl px-10 py-5 font-bold text-white shadow-xl shadow-yellow-500/20 hover:shadow-yellow-500/40 transition-all duration-300 w-full sm:w-fit active:scale-95"
            onClick={navigate}
          >
            <span className="text-xl font-lexend">Launch Swap App</span>
            <CornerDownRight className="w-5 h-5" />
          </motion.button>

          <div className="flex items-center gap-6 mt-10 lg:mt-12 opacity-80">
            <div className="flex flex-col">
              <span className="text-3xl lg:text-4xl font-bold font-lexend text-white text-glow">40M+</span>
              <span className="text-xs lg:text-sm text-gray-400 uppercase tracking-widest font-semibold">Pioneers</span>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-3xl lg:text-4xl font-bold font-lexend text-white text-glow">$1.2B</span>
              <span className="text-xs lg:text-sm text-gray-400 uppercase tracking-widest font-semibold">Liquidity</span>
            </div>
          </div>

          <div className="w-full max-w-full mt-10 overflow-hidden bg-white/5 border-y border-white/10 py-4 glass-panel rounded-xl lg:rounded-2xl">
            <div className="flex gap-10 items-center whitespace-nowrap animate-marquee text-sm font-medium text-gray-300/90 select-none">
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> Protocol v23 Ready</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-yellow-400" /> CertiK 2026 Audited</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Non-Custodial Secure</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-400" /> $314 GCV Supported</span>
              {/* Duplicate for seamless loop */}
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> Protocol v23 Ready</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-yellow-400" /> CertiK 2026 Audited</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Non-Custodial Secure</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-400" /> $314 GCV Supported</span>
            </div>
          </div>
        </div>

        <motion.div
          variants={slideIn('up', 'tween', 0.3, 1)}
          className="lg:w-1/2 relative mt-16 lg:mt-0 flex justify-center items-center w-full min-h-[300px]"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-purple-600/20 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />

          <div className="relative w-full max-w-[280px] xs:max-w-xs sm:max-w-md lg:max-w-xl px-2 lg:px-0">
            <Image
              src="/pi_video-6.webp"
              alt="Pi Network App"
              width={600}
              height={600}
              className="relative z-10 drop-shadow-2xl lg:hover:-translate-y-4 transition-transform duration-700 w-full h-auto rounded-3xl lg:rounded-[3rem] opacity-100 scale-100"
              priority
            />
          </div>
        </motion.div>
      </div>


      {/**Download section */}
      <div className="mt-20 lg:mt-32">
        <DownloadSection />
      </div>

      {/**Footer */}
      <div className="hidden md:block">
        <Footer />
      </div>
    </motion.div>
  );
};
export default Landing;
