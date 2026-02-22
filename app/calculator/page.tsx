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
      className="min-h-screen py-10 px-4 md:px-0 bg-transparent flex flex-col items-center relative overflow-hidden"
    >
      {/* Premium DEX Ambient Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-900/40 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute top-[40%] left-[50%] translate-x-[-50%] w-[800px] h-[400px] bg-yellow-500/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="flex items-center justify-center mb-6">
        <a
          href="/"
          className="hover:scale-110 active:scale-105 transition-all duration-300 hover:text-white cursor-pointer"
        >
          <Image
            src={`/piLogo.png`}
            alt="Pi Network Logo"
            width={100}
            height={100}
            quality={90}
            priority
            className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-2xl"
          />
        </a>
      </div>

      <div className="flex flex-col justify-between items-center mb-6">
        <div className="bg-purple-900/40 border border-purple-500/20 px-6 py-2 rounded-full mb-3 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:scale-105 transition-transform duration-300 cursor-default">
          <p className="text-purple-300 font-bold text-sm tracking-widest uppercase">Pi to USDT Swap</p>
        </div>

        <div className="mb-6 flex flex-col items-center">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Community Liquidity Pool</p>
          <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300 text-glow">
            $1.2B USDT Reserve
          </p>
        </div>

        <section className="flex flex-row py-3 container justify-center items-center space-x-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full group-hover:bg-yellow-500/40 transition-colors" />
            <Image
              src={`/piLogo.png`}
              alt="Pi"
              width={64}
              height={64}
              quality={90}
              priority
              className="w-16 h-16 object-contain relative z-10"
            />
          </div>

          <div className="w-10 h-[2px] bg-gradient-to-r from-yellow-500/50 via-purple-500/50 to-green-500/50" />

          <div className="relative group">
            <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full group-hover:bg-green-500/40 transition-colors" />
            <Image
              src={`/usdt.png`}
              alt="USDT"
              width={64}
              height={64}
              quality={90}
              priority
              className="w-16 h-16 object-contain relative z-10"
            />
          </div>
        </section>
      </div>

      {/* The Core Swap Component */}
      <NumberInput multiplier={314.15} />

    </motion.section>
  );
};
export default Page;
