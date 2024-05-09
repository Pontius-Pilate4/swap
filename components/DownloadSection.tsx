'use client';
import { motion } from 'framer-motion';
import { staggerContainer, slideIn } from '@/utils/motion';
import Image from 'next/image';

const DownloadSection = () => {
  return (
    <motion.section
      variants={staggerContainer(0.1, 0.1)}
      initial="hidden"
      whileInView={`show`}
      viewport={{ once: false, amount: 0.25 }}
      className="downloadGradient flex flex-col pb-5 "
    >
      <div className="flex flex-col lg:flex-row lg:px-[300px] gap-5 lg:gap-[100px] ">
        <Image
          src="/download.webp"
          alt="phone"
          width={200}
          height={200}
          className="self-center"
        />

        <div className="flex flex-col gap-5 mt-[50px] padding-x md:px-[100px]">
          <motion.h3
            variants={slideIn('left', 'spring', 0.7, 0.75)}
            initial="hidden"
            whileInView={`show`}
            className=" font-lexend text-[24px] sm:text-[32px] lg:text-[50px]  text-yellow-300 "
          >
            Download the mobile app <br /> to start mining today! Join now.
          </motion.h3>

          <p
            
            className=" text-white text-[16px] sm:text-[18px] lg:text-[20px] font-medium leading-7 self-center font-work  tracking-wide "
          >
            Keep your money! Mining Pi is free. <br /> All you need is an
            invitation from an existing trusted member on the network. <br /> If
            you have an invitation you can download the mobile app below.{' '}
          </p>

          <a
            href="https://play.google.com/store/apps/details?id=com.blockchainvault&pli=1"
            target="_blank"
          >
            <Image
              src="/google_play.webp"
              alt="google_play"
              width={300}
              height={89}
            />
          </a>

          <a
            href="https://apps.apple.com/us/app/pi-network/id1445472541"
            target="_blank"
          >
            <Image
              src="/apple_store.webp"
              alt="google_play"
              width={300}
              height={89}
            />
          </a>
        </div>
      </div>
    </motion.section>
  );
};
export default DownloadSection;
