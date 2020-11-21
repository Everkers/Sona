module.exports = (msg, prefix) => {
  const args = msg.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  return { command, args };
};
