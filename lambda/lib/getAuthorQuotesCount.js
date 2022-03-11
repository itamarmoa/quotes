const getAuthorQuotes = require('./getAuthorQuotes');

module.exports = async (author) => {
  const quoteList = await getAuthorQuotes(author);
  return {
    author,
    count: quoteList.length,
  };
};
