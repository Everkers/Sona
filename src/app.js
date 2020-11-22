require('dotenv').config();
const Discord = require('discord.js');
const getCommand = require('./utils/getCommand');
const { prefix } = require('../config.json')[0];
const { upComingGames, ranking } = require('./commands');

const { DISCORD_TOKEN } = process.env;
const client = new Discord.Client();
client.on('message', async (msg) => {
  if (msg.content.startsWith(prefix) || !msg.author.bot) {
    const { command, args } = getCommand(msg, prefix);
    if (command.match(new RegExp('upnext', 'gi'))) {
      upComingGames(msg);
    } else if (command.match(new RegExp('board', 'gi'))) {
      ranking(msg);
    }
  }
});
client.on('ready', () => {
  console.log('🎉 Discord bot is ready');
});
client.login(DISCORD_TOKEN);
