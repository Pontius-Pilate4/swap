const { Redis } = require("@upstash/redis");

const redisUrl = "https://evolved-hen-47919.upstash.io";
const redisToken = "AbsvAAIncDJkMmFiYjJjNjJmNDk0ZjMwYWZhNjYxZjlkMTAwNDBhMHAyNDc5MTk";

const redis = new Redis({
    url: redisUrl,
    token: redisToken,
});

async function clearKeys() {
    try {
        const keys = await redis.keys('wallet:*');
        if (keys.length > 0) {
            await redis.del(...keys);
            console.log(`Deleted ${keys.length} cached wallets.`);
        } else {
            console.log("No cached wallets found.");
        }
    } catch (err) {
        console.error("Redis Error:", err);
    }
}

clearKeys();
