// Upcoming games command handler
const axios = require('axios');
const Discord = require('discord.js');

module.exports = async (msg, args) => {
  const { URL } = process.env;
  try {
    const { data } = await axios.get(`${URL}/upcoming-matches`);
    if (+data.code !== 200) {
      throw new Error(data.message);
    }
    const name = args.join(' ');
    const filteredResult = data.result.filter((game) => game.opponents.match(new RegExp(name, 'gi')));
    const message = new Discord.MessageEmbed();
    const objData = filteredResult || data.result;
    if (filteredResult.length === 0) {
      msg.channel.send(`It Seems like \`${name}\` is not playing this week or it doesn't exist.`);
    } else {
      message.setColor('#e74c3c')
        .setTitle('Intel Arabian Cup Schedule')
        .setDescription('Iac Upcoming Matches :calendar_spiral:');
      objData.forEach((match) => {
        message.addField(
          match.opponents, `At ${match.date}`,
          true,
        );
      });
      msg.channel.send(message);
    }
  } catch (err) {
    msg.channel.send(err.message);
  }
};
