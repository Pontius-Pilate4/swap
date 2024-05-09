'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

type MiningCardsProps = {
  index: number;
  icon: string;
  title: string;
  description: string;
};

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const MiningCards = ({ index, icon, title, description }: MiningCardsProps) => {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      transition={{
        delay: index * 0.25,
        ease: 'easeInOut',
        duration: 0.5,
      }}
      viewport={{ amount: 0.5, once: false }}
      className="flex flex-col gap-5 w-[300px] h-[300px] bg-white shadow-md hover:scale-105 active:scale-100 transition-all duration-200 items-center justify-center rounded-md py-3"
    >
      <Image src={icon} alt="icon" width={25} height={25} />
      <p className="text-[18px] font-lexend font-semibold text-gray-700 tracking-wide">
        {title}
      </p>
      <p className="text-[14px] leading-7 px-5 font-medium font-work text-gray-500 tracking-wide">
        {description}
      </p>
    </motion.div>
  );
};
export default MiningCards;
