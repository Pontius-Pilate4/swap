'use client';
import { motion } from 'framer-motion';
import { staggerContainer, slideIn } from '@/utils/motion';
import Image from 'next/image';

const DownloadSection = () => {
  return (
    <motion.section
      variants={staggerContainer(0.1, 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="bg-[#120822] py-20 lg:py-32 relative overflow-hidden"
    >
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-24 relative z-10">
        <motion.div
          variants={slideIn('left', 'tween', 0.2, 0.75)}
          className="relative w-48 sm:w-64 lg:w-80 group"
        >
          <div className="absolute inset-0 bg-yellow-400/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          <Image
            src="/download.webp"
            alt="phone"
            width={400}
            height={400}
            className="relative z-10 w-full h-auto drop-shadow-[0_20px_50px_rgba(244,171,0,0.3)]"
          />
        </motion.div>

        <div className="flex flex-col gap-6 text-center lg:text-left items-center lg:items-start max-w-2xl">
          <motion.h3
            variants={slideIn('up', 'tween', 0.4, 0.75)}
            className="text-4xl xs:text-5xl lg:text-7xl font-lexend font-bold tracking-tight text-white leading-[1.1]"
          >
            Start Mining <span className="text-yellow-400">Pi</span> <br className="hidden sm:block" /> On The Go.
          </motion.h3>

          <motion.p
            variants={slideIn('up', 'tween', 0.6, 0.75)}
            className="text-lg sm:text-xl text-gray-400 font-work leading-relaxed"
          >
            Mining Pi is free and secure. Join the global community of 40M+ Pioneers and unlock the true value of your digital assets tonight.
          </motion.p>

          <motion.div
            variants={slideIn('up', 'tween', 0.8, 0.75)}
            className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto"
          >
            <a
              href="https://play.google.com/store/apps/details?id=com.blockchainvault&pli=1"
              target="_blank"
              rel="noreferrer"
              className="flex-shrink-0 active:scale-95 transition-transform"
            >
              <Image
                src="/google_play.webp"
                alt="Google Play Store"
                width={200}
                height={60}
                className="h-14 w-auto sm:h-16 brightness-90 hover:brightness-100 transition-all"
              />
            </a>

            <a
              href="https://apps.apple.com/us/app/pi-network/id1445472541"
              target="_blank"
              rel="noreferrer"
              className="flex-shrink-0 active:scale-95 transition-transform"
            >
              <Image
                src="/apple_store.webp"
                alt="Apple App Store"
                width={200}
                height={60}
                className="h-14 w-auto sm:h-16 brightness-90 hover:brightness-100 transition-all"
              />
            </a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
export default DownloadSection;
