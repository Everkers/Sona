require('dotenv').config();
const Discord = require('discord.js');

const { DISCORD_TOKEN } = process.env;
const client = new Discord.Client();
client.on('ready', () => {
  console.log('🎉 Discord bot is ready');
});
client.login(DISCORD_TOKEN);
