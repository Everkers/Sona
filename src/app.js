require('dotenv').config();
const Discord = require('discord.js');
const getCommand = require('./utils/getCommand');
const { prefix } = require('../config.json')[0];
const upComingNext = require('./commands/upComingGames');

const { DISCORD_TOKEN } = process.env;
const client = new Discord.Client();
client.on('message', async (msg) => {
  if (msg.content.startsWith(prefix) || !msg.author.bot) {
    const { command, args } = getCommand(msg, prefix);
    if (command.match(new RegExp('upnext', 'gi'))) {
      upComingNext(msg);
    }
  }
});
client.on('ready', () => {
  console.log('🎉 Discord bot is ready');
});
client.login(DISCORD_TOKEN);
