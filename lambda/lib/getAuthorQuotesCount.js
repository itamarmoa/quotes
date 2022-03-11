const getAuthorQuotes = require('./getAuthorQuotes');

module.exports = async (author) => {
  const quoteList = await getAuthorQuotes(author);
  return quoteList.length;
};
