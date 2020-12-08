const TeleBot = require("telebot");
const path = require("path");
const CurrencyRate = require("./src/currencyRate");
const env = process.env;

async function main() {
  //const currency = new CurrencyRate();
  //await currency.update();
  //console.log(CurrencyRate, currency.usd, currency.eur, currency.rub);

  const bot = new TeleBot({
    token: env.TELEGRAM_TOKEN, // Required. Telegram Bot API token.
    polling: {
      // Optional. Use polling.
      interval: 1000, // Optional. How often check updates (in ms).
      timeout: 0, // Optional. Update polling timeout (0 - short polling).
      limit: 100, // Optional. Limits the number of updates to be retrieved.
      retryTimeout: 5000, // Optional. Reconnecting timeout (in ms).
    },
    allowedUpdates: [], // Optional. List the types of updates you want your bot to receive. Specify an empty list to receive all updates.
  });

  bot.on(["/start", "/hello"], start);

  bot.start();
  console.log();

  function start(msg) {
    // add user to db

    msg.reply.text(`Welcome ${msg.from.first_name} ${msg.from.last_name}!`);
  }
}

main();
