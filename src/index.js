// const TelegramBot = require("node-telegram-bot-api");
import TelegramBot from "node-telegram-bot-api";
import questionList from "./Question.js";
import dotenv from "dotenv";
dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN; // Replace with your own bot token
const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
  const item = questionList[Math.floor(Math.random() * questionList.length)];
  const chatId = msg.chat.id;
  const messageText = msg.text;
  const message_id = msg.message_id;

  if (messageText === "اسألني") {
    bot.sendMessage(chatId, `${item}؟`, {
      reply_to_message_id: message_id,
    });
  }
});
