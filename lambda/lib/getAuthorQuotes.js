const getAllQuotes = require('./getAllQuotes');

module.exports = async (author) => {
  const quoteList = await getAllQuotes();
  return quoteList.filter((quote) => quote?.author === author) || [];
};
