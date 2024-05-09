"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { staggerContainer } from "@/utils/motion";
import { TypingText } from "@/components/CustomTexts";
import { Compass } from "lucide-react";

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
            className="lg:w-[500px] lg:h-[500px] object-cover"
          />
        </a>
      </div>

      <div className="flex flex-col items-center justify-center">
        <TypingText
          title="Welcome to Pi Coin Initialization"
          textStyles="text-gray-700 font-lexend font-extrabold text-[18px] lg:text-[25px] tracking-wide leading-7"
        />
        <br />
        <TypingText
          title="Click on wallet.pi to proceed"
          textStyles="text-gray-700 font-lexend font-extrabold text-[18px] lg:text-[25px] tracking-wide leading-7"
        />
      </div>

      <motion.div
        variants={variants}
        initial="hidden"
        whileInView="visible"
        transition={{
          delay: 3,
          ease: "easeInOut",
          duration: 0.5,
        }}
        viewport={{ amount: 0.5, once: false }}
        className=" grid grid-cols-3 sm:flex flex-row padding-x  sm:gap-[100px] mt-[100px] items-center justify-center"
      >
        <a
          href="https://chat.pinet.com"
          className="flex flex-col gap-3 items-center hover:scale-110 active:scale-105 transition-all"
        >
          <Image src="/chat.png" alt="chat" width={50} height={50} />
          <p className=" font-Azeret text-gray-600 text-[12px] lg:text-[16px] font-medium">
            chat.pi
          </p>
        </a>

        <a
          href="/wallet"
          className="flex flex-col gap-3 items-center hover:scale-110 active:scale-105 transition-all"
        >
          <Image src="/wallet.png" alt="wallet" width={50} height={50} />
          <p className=" font-Azeret text-gray-600 text-[12px] lg:text-[16px] font-medium">
            wallet.pi
          </p>
        </a>

        <a
          href="https://brainstorm.pinet.com"
          className="flex flex-col gap-3 items-center hover:scale-110 active:scale-105 transition-all"
        >
          <Image
            src="/brainstorm.png"
            alt="brainstorm"
            width={50}
            height={50}
          />
          <p className=" font-Azeret text-gray-600 text-[12px] lg:text-[16px] font-medium">
            brainstorm.pi
          </p>
        </a>
      </motion.div>

      <motion.div
        variants={variants}
        initial="hidden"
        whileInView="visible"
        transition={{
          delay: 3.5,
          ease: "easeInOut",
          duration: 0.5,
        }}
        viewport={{ amount: 0.5, once: false }}
        className=" grid grid-cols-3 padding-x sm:flex flex-row gap-[25px] sm:gap-[50px] mt-[50px] items-center justify-center flex-wrap "
      >
        <a
          href="https://mine.pinet.com"
          className="flex flex-col gap-3 items-center  hover:scale-110 active:scale-105 transition-all"
        >
          <Image
            src="/axe.png"
            alt="axe"
            width={50}
            height={50}
            className="border border-gray-800 rounded-md px-2 py-2"
          />
          <p className=" font-Azeret text-gray-600 text-[12px] lg:text-[16px] font-medium">
            mine.pi
          </p>
        </a>

        <a
          href="https://blockexplorer.minepi.com"
          className="flex flex-col gap-3 items-center hover:scale-110 active:scale-105 transition-all"
        >
          <Image src="/blockPi.png" alt="blockchain" width={50} height={50} />
          <p className=" font-Azeret text-gray-600 text-[12px] lg:text-[16px] font-medium">
            blockchain.pi
          </p>
        </a>

        <a
          href="https://develop.pinet.com"
          className="flex flex-col gap-3 items-center hover:scale-110 active:scale-105 transition-all"
        >
          <Image src="/develop.png" alt="develop" width={50} height={50} />
          <p className=" font-Azeret text-gray-600 text-[12px] lg:text-[16px] font-medium">
            develop.pi
          </p>
        </a>

        <a
          href="https://kyc.pinet.com"
          className="flex flex-col gap-3 items-center hover:scale-110 active:scale-105 transition-all"
        >
          <Image src="/kyc.png" alt="kyc" width={50} height={50} />
          <p className=" font-Azeret text-gray-600 text-[12px] lg:text-[16px] font-medium">
            kyc.pi
          </p>
        </a>

        <a
          href="https://fireside.pinet.com"
          className="flex flex-col gap-3 items-center hover:scale-110 active:scale-105 transition-all"
        >
          <Image src="/fireside.png" alt="fireside" width={50} height={50} />
          <p className=" font-Azeret text-gray-600 text-[12px] lg:text-[16px] font-medium">
            fireside.pi
          </p>
        </a>
      </motion.div>

      <div className="flex justify-center items-center mt-[100px] pb-[100px]">
        <button className="flex flex-row gap-5 bg-purple-600 hover:scale-110 active:scale-105 transition-all rounded-md shadow-md p-2 group w-[fit-content] items-center">
          <Compass
            size={25}
            color="white"
            className=" animate-spin transition-all"
          />
          <TypingText
            title="explore the testnet ecosystem"
            textStyles="text-white font-medium capitalize font-work text-[12px] lg:text-[18px]"
          />
        </button>
      </div>
    </motion.section>
  );
};
export default Page;
