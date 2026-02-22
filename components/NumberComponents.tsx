"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SwapFlowModal from "./SwapFlowModal";

interface NumberInputProps {
  multiplier: number;
}

const NumberInput: React.FC<NumberInputProps> = ({ multiplier }) => {
  const router = useRouter();
  const [value, setValue] = useState<number | ''>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock real-time transaction ticker for high-impact social proof
  useEffect(() => {
    const messages = [
      "Pioneer @Alex_Pi just swapped 50 Pi at $314.159 GCV.",
      "Pioneer @SarahV successfully received $37,699 USDT.",
      "Pioneer @CryptoDan verified and locked in 150 Pi.",
      "Pioneer @MingLi just swapped 80 Pi for $25,132 USDT.",
      "Pioneer @JohnDoe_Pi completed a 200 Pi swap.",
      "Pioneer @Elena77 successfully received $15,707 USDT.",
      "Pioneer @PiWhale verified wallet and locked 500 Pi.",
      "Pioneer @David_K just swapped 65 Pi at GCV.",
      "Pioneer @Anna_Pi successfully received $109,955 USDT.",
      "Pioneer @MarcusC completed a 120 Pi swap.",
      "Pioneer @Sophia_X successfully received $18,849 USDT."
    ];
    let idx = 0;
    // initial message
    setToastMessage(messages[idx]);
    idx++;

    const interval = setInterval(() => {
      setToastMessage(messages[idx]);
      idx = (idx + 1) % messages.length;
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const swapFn = () => {
    setIsModalOpen(true);
  };

  const handleSetMax = () => {
    setValue(100); // Or whatever balance logic would go here
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    if (val === '') {
      setValue('');
      return;
    }
    const newValue = parseFloat(val);
    if (!isNaN(newValue) && newValue >= 0) {
      setValue(newValue);
    }
  };

  const displayUsdt = value === '' ? 0 : (value * multiplier).toFixed(2);
  const isValid = value !== '' && value > 0;

  return (
    <div className="w-full max-w-md mx-auto flex flex-col justify-center space-y-2 px-4 py-8 relative">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-white tracking-wide">Swap</h2>
        <div className="flex items-center gap-2 bg-purple-900/40 px-3 py-1 rounded-full border border-purple-500/30">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-semibold text-purple-200">π1 = ${multiplier}</span>
        </div>
      </div>

      {/* From Card */}
      <div className="relative w-full neumorphic-card glass-panel border border-white/5 rounded-2xl p-5 hover:border-purple-500/40 transition-colors">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-400">You Pay</span>
          <span className="text-xs text-gray-500 font-medium cursor-pointer hover:text-purple-300 transition-colors" onClick={handleSetMax}>
            Balance: 0.00
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <input
            type="number"
            value={value}
            onChange={handleInputChange}
            placeholder="0"
            className="w-full bg-transparent text-4xl font-bold outline-none text-white placeholder-gray-600 appearance-none m-0"
            style={{ WebkitAppearance: 'none', margin: 0 }}
          />
          <div className="flex items-center gap-2 bg-[#2d1b4e] rounded-xl px-3 py-2 shadow-inner border border-purple-500/10">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center p-0.5 shadow-md">
              <span className="text-black font-extrabold text-[10px] leading-none">π</span>
            </div>
            <span className="font-bold text-white text-lg">PI</span>
          </div>
        </div>
      </div>

      {/* Decorative Swap Arrow */}
      <div className="absolute left-1/2 top-[47%] -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="bg-[#1e0f33] p-2 rounded-xl border-4 border-[#120822] cursor-pointer hover:bg-purple-800 transition-colors shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-300">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </div>
      </div>

      {/* To Card */}
      <div className="relative w-full neumorphic-card glass-panel border border-white/5 rounded-2xl p-5 mt-1 hover:border-purple-500/40 transition-colors">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-400">You Receive</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <input
            type="text"
            value={displayUsdt}
            disabled
            className="w-full bg-transparent text-4xl font-bold outline-none text-white opacity-80"
          />
          <div className="flex items-center gap-2 bg-[#2d1b4e] rounded-xl px-3 py-2 shadow-inner border border-purple-500/10">
            <div className="w-6 h-6 rounded-full bg-[#26A17B] flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-[10px] leading-none">₮</span>
            </div>
            <span className="font-bold text-white text-lg">USDT</span>
          </div>
        </div>
      </div>

      {/* Exchange Details (Slippage etc.) */}
      {isValid && (
        <div className="w-full px-2 py-3 mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex justify-between items-center text-sm border-t border-white/5 pt-3">
            <span className="text-gray-400">Exchange Rate</span>
            <span className="text-gray-200">1 PI = {multiplier} USDT</span>
          </div>
          <div className="flex justify-between items-center text-sm mt-2">
            <span className="text-gray-400">Network Fee</span>
            <span className="text-gray-200">~0.01 PI</span>
          </div>
        </div>
      )}

      {/* Floating Action Button for Mobile / Standard CTA for Desktop */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0f0518] to-transparent pointer-events-none md:relative md:p-0 md:mt-6 md:bg-none z-40">
        <button
          className={`w-full py-4 rounded-2xl font-bold text-lg pointer-events-auto transition-all duration-300 shadow-xl ${isValid
            ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 active:scale-[0.98] text-white"
            : "bg-purple-900/50 text-purple-300/50 cursor-not-allowed"
            }`}
          disabled={!isValid}
          onClick={swapFn}
        >
          {isValid ? "Proceed to Swap" : "Enter an amount"}
        </button>
      </div>

      {/* Real-time Ticker Toast */}
      {toastMessage && (
        <div key={toastMessage} className="fixed bottom-24 left-4 z-50 glass-panel md:bottom-8 px-4 py-3 rounded-xl flex items-center gap-3 animate-toast shadow-2xl border-l-4 border-l-yellow-400">
          <div className="w-8 h-8 rounded-full bg-purple-900 flex items-center justify-center">
            <span className="text-yellow-400 font-bold text-xs">PI</span>
          </div>
          <p className="text-sm font-medium text-gray-200">{toastMessage}</p>
        </div>
      )}

      <SwapFlowModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        piAmount={Number(value) || 0}
        usdtAmount={displayUsdt.toString()}
      />
    </div>
  );
};

export default NumberInput;
