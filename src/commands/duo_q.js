const DuoqDbHandler = require('../classes/duoqDbHandler');
const { data, display } = require('../utils/elos.json')[0];
const Discord = require('discord.js');

module.exports = async (msg, args) => {
  if (args[0] === 'elos') {
    const message = new Discord.MessageEmbed();
    console.log(data);
    message.setColor('#e74c3c')
      .setTitle('League of legends Elos');
    display.forEach((item) => {
      message.addField(item, '‎', true);
    });
    msg.channel.send(message);
  }
  if (args[0] === 'add') {
    const [command, ign, elo] = args;
    if (!ign || !elo) {
      msg.channel.send('Invalid options  example : `$sona duoq add ign elo`');
    } else if (!data.includes(elo)) {
      msg.channel.send('This elo doesn\'t exist, type `$sona duoq elos` to get list of available elos');
    } else {
      const duoQueue = new DuoqDbHandler(msg, msg.author.tag, ign, elo, msg.author.id);
      duoQueue.addUser();
    }
  }
  if (args[0] === 'looking') {
    const [command, looking] = args;
    const duoQueue = new DuoqDbHandler(msg, msg.author.tag, null, null, msg.author.id);
    let isLooking = null;
    if (looking === 'on') isLooking = true;
    else if (looking === 'off') isLooking = false;
    else msg.channel.send('Invalid option `example : $sona duoq looking (on or off)`');
    if (isLooking != null) duoQueue.changeStatus(isLooking);
  }
};
