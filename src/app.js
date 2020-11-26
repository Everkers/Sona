require('dotenv').config();
const Discord = require('discord.js');
const cron = require('node-cron');
const moment = require('moment');
// classes
const getCommand = require('./utils/getCommand');
const getFxgGame = require('./utils/getFxgGame');
const convertTime12to24 = require('./utils/convertTime12to24 ');
const { prefix } = require('../config.json')[0];
const { upComingGames, ranking, duoQ } = require('./commands');

const { DISCORD_TOKEN } = process.env;
const client = new Discord.Client();
client.on('message', async (msg) => {
  if (msg.content.startsWith(prefix) || !msg.author.bot) {
    const { command, args } = getCommand(msg, prefix);
    if (command.match(new RegExp('upnext', 'gi'))) {
      upComingGames(msg, args);
    } else if (command.match(new RegExp('board', 'gi'))) {
      ranking(msg, args);
    } else if (command.match(new RegExp('duoq', 'gi'))) {
      duoQ(msg, args);
    }
  }
});
client.on('ready', () => {
  console.log('🎉 Discord bot is ready');
  cron.schedule('0 0 * * *', async () => {
    const [game] = await getFxgGame();
    if (game) {
      const [dayWord, date, time, timeZone] = game.date.split(' ');
      const currentDate = moment().format('D-MM-YYYY');
      if (date === currentDate) {
        const time24 = convertTime12to24(time);
        setTimeout(() => {
          console.log('its game time');
        }, time24.hours * (60000 * 60));
      }
    }
  });
});
client.login(DISCORD_TOKEN);
