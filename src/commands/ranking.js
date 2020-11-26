const axios = require('axios');
const Discord = require('discord.js');

module.exports = async (msg, args) => {
  const { URL } = process.env;
  try {
    const { data } = await axios.get(`${URL}/ranking`);
    if (+data.code !== 200) {
      throw new Error(data.message);
    }
    const name = args.join(' ');
    const filteredResult = data.result.filter((team) => team.name.match(new RegExp(name, 'gi')));
    const objData = filteredResult || data.result;
    if (filteredResult.length === 0) {
      msg.channel.send(`Sorry i cannot find \`${name}\` on the ranking board.`);
    } else {
      const message = new Discord.MessageEmbed();
      message.setColor('#e74c3c')
        .setTitle('Intel Arabian Cup Ranking Board')
        .setDescription('Iac teams ranking :tada:');
      objData.forEach((team, i) => {
        message.addField(`[${i + 1}] ${team.name}`, `${Object.entries(team.scoreBoard).map((item) => `\`\`${item[0]}\`\` : ${item[1]}\n`).join('')}`, true);
      });
      msg.channel.send(message);
    }
  } catch (err) {
    msg.channel.send(err.message);
  }
};
