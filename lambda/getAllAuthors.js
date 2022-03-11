const getAllAuthors = require('./lib/getAllAuthors');

module.exports = async () => {
  try {
    const authors = await getAllAuthors();
    return {
      statusCode: 200,
      body: JSON.stringify(authors),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message }),
    };
  }
};
