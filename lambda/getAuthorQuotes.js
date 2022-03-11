const getAuthorQuotes = require('./lib/getAuthorQuotes');

module.exports = async (event) => {
  const { authorName } = event.pathParameters;
  if (!authorName) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Author name is required',
      }),
    };
  }
  try {
    const quotes = await getAuthorQuotes(decodeURI(authorName));
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
