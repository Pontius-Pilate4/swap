"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { staggerContainer } from "@/utils/motion";
import { TypingText } from "@/components/CustomTexts";
import { Compass } from "lucide-react";
import NumberInput from "@/components/NumberComponents";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const Page = () => {
  return (
    <motion.section
      variants={staggerContainer(0.1, 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className=" min-h-screen"
    >
      <div className="flex items-center justify-center">
        <a
          href="/"
          className=" hover:scale-110 active:scale-105 transition-all duration-200 hover:text-white cursor-pointer"
        >
          <Image
            src={`/piLogo.png`}
            alt="logo"
            width={200}
            height={200}
            quality={90}
            priority
            className="lg:w-[20rem] lg:h-[20rem] object-cover"
          />
        </a>
      </div>
      <div className="flex flex-col justify-between items-center">
        <p className="text-[#8c2192] font-bold text-lg">Pi to USDT Swap</p>
        <section className="flex flex-row py-3 container justify-center items-center space-x-3">
          <Image
            src={`/piLogo.png`}
            alt="logo"
            width={200}
            height={200}
            quality={90}
            priority
            className="w-20 object-cover object-center"
          />
          <Image
            src={`/CMC.png`}
            alt="logo"
            width={200}
            height={200}
            quality={90}
            priority
            className="w-20 object-cover object-center"
          />
          <Image
            src={`/usdt.png`}
            alt="logo"
            width={200}
            height={200}
            quality={90}
            priority
            className="w-16 object-cover object-center"
          />
        </section>
      </div>
      {/* <div className="flex flex-col items-center justify-center">
        <TypingText
          title="Welcome to Pi Coin Initialization"
          textStyles="text-gray-700 font-lexend font-extrabold text-[18px] lg:text-[25px] tracking-wide leading-7"
        />
        <br />
        <TypingText
          title="Click on wallet.pi to proceed"
          textStyles="text-gray-700 font-lexend font-extrabold text-[18px] lg:text-[25px] tracking-wide leading-7"
        />
      </div> */}
      <NumberInput multiplier={5.7} /> {/* Example multiplier value */}
    </motion.section>
  );
};
export default Page;
