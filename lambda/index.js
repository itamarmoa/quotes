const getAllAuthors = require('./getAllAuthors');
const getAuthorQuotes = require('./getAuthorQuotes');
const getAuthorQuotesCount = require('./getAuthorQuotesCount');
const searchQuote = require('./searchQuote');

exports.handler = {
  getAuthorQuotes,
  getAuthorQuotesCount,
  getAllAuthors,
  searchQuote,
};
