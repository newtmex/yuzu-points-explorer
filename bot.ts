import { Bot } from "grammy";

if (!process.env.BOT_TOKEN || !process.env.CHANNEL_ID)
    throw new Error("no process.env.BOT_TOKEN or CHANNEL_ID");

export const bot = new Bot(process.env.BOT_TOKEN);
