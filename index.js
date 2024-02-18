// index.js
import TelegramBot from "node-telegram-bot-api";
import questionList from "./Question.js";
import http from "http";
import dotenv from "dotenv";
dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const port = process.env.PORT;

const bot = new TelegramBot(token);
const server = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/webhook") {
    await bot.processUpdate(req.body);
    res.statusCode = 200;
    res.write("OK");
    res.end();
  } else {
    res.statusCode = 404;
    res.write("Not Found");
    res.end();
  }
});

server.listen(port, () => {
  bot.setWebHook(`https://amine-bot.vercel.app/webhook`);
  console.log(`Server is listening on port ${port}`);
});

bot.on("message", (msg) => {
  const item = questionList[Math.floor(Math.random() * questionList.length)];
  const chatId = msg.chat.id;
  const messageText = msg.text;

  if (messageText === "اسألني") {
    bot.sendMessage(chatId, `${item}؟`);
  }
});