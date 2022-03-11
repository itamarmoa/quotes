const getAllQuotes = require('./getAllQuotes');

module.exports = async (searchText) => {
  const quoteList = await getAllQuotes();
  const searchReg = new RegExp(`${searchText}`, 'i');
  return quoteList.filter((quote) => searchReg.test(quote.text)) || [];
};
