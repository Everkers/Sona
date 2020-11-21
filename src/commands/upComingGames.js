// Upcoming games command handler
const axios = require('axios');
const Discord = require('discord.js');

module.exports = async (msg) => {
  const { URL } = process.env;
  try {
    const { data } = await axios.get(`${URL}/upcoming-matches`);
    if (+data.status !== 200) {
      throw new Error(data.message);
    }
    const message = new Discord.MessageEmbed();
    message.setColor('#e74c3c')
      .setAuthor('Intel Arabian Cup Schedule')
      .setImage('attachment://iac-logo.png');
    data.result.forEach((match) => {
      message.addField(
        match.opponents, `At ${match.date}`,
        true,
      );
    });
    msg.channel.send(message);
  } catch (err) {
    msg.channel.send(err.message);
  }
};
