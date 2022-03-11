const axios = require('axios');
const externalUrl = process.env.EXTERNAL_URL;

module.exports = async () => {
  try {
    const response = await axios.get(externalUrl);
    return response?.data || [];
  } catch (error) {
    console.error(error);
  }
};
