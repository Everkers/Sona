const axios = require('axios');

module.exports = async () => {
  const { URL } = process.env;
  const { data } = await axios.get(`${URL}/upcoming-matches`);
  const fxgGames = data.result.filter((game) => game.opponents.includes('FOX GAMING'));
  return fxgGames;
};
