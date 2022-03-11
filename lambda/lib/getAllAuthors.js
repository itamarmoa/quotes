const getAllQuotes = require('./getAllQuotes');

module.exports = async () => {
  const quoteList = await getAllQuotes();
  const authors = quoteList.reduce((result, { author }) => {
    if (author) {
      result.push(author);
    }
    return result;
  }, []);
  return [...new Set(authors)];
};
