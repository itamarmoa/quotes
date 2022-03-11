const getAuthorQuoteCount = require('./lib/getAuthorQuotesCount');

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
    const count = await getAuthorQuoteCount(decodeURI(authorName));
    return {
      statusCode: 200,
      body: JSON.stringify(count),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message }),
    };
  }
};
