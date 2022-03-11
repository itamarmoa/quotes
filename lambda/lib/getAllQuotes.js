const axios = require('axios');
const externalUrl = process.env.EXTERNAL_URL;

module.exports = async () => {
  const response = await axios.get(externalUrl);
  return response?.data;
};
