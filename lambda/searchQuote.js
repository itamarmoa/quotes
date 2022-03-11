const searchQuote = require('./lib/searchQuote');

module.exports = async (event) => {
  const { searchText } = event.pathParameters;
  try {
    const quotes = await searchQuote(decodeURI(searchText));
    return {
      statusCode: 200,
      body: JSON.stringify(quotes),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message }),
    };
  }
};
