FG.factory('portfolioService',
  ['transactionService', 'dateService',
  function(transactionService, dateService) {

    var cash = { dollar: 1000 };
    var transactionSubset = {};
    var portfolio = {};

    var getCash = function getCash() {
      return cash;
    };

    var updateCash = function updateCash(amount, type) {
      parseFloat(amount);
      amount = type === 'buy' ? -amount : amount;
      cash.dollar += amount;
    };

    // using the current date
    // iterate through all transactions previous to this date (copy subset or all data from the transaction service?)
      // display current stock portfolio
        // add and remove based on buy and sell
        // should also hook into trade
      // calculate the cash history

    var updatePortfolioData = function getTransactions(date) {
      var transactions = transactionService.getTransactions();
      var newPortfolio = {};

      var currentDate = dateService.convertDateString(date);

      for (var i = 0; i < transactions.length; i++) {
        var stockDate = transactions[i].date;
        var iterationDate = dateService.convertDateString(stockDate);
        // break out of loop when we're past given date
        if (iterationDate > currentDate) { break; }

        // otherwise add the stock to the transactionSubset
        if (!newPortfolio[stockDate]) {
          newPortfolio[stockDate] = {};
        }
        newPortfolio[stockDate] = transactions[i];
      }

      angular.copy(newPortfolio, transactionSubset);
      recalcPortfolio();
    };

    // refactor this?  calculate everything within updatePortfolio it iterates
    var recalcPortfolio = function recalcPortfolio() {
      var calculations = {
        value: 0
      };

      // wrong object, group everything by stockSymbol
      for (transactionDate in transactionSubset) {
        var transObj = transactionSubset[transactionDate];
        calculations.value += transObj.price * transObj.quantity;
      }

      angular.copy(calculations, portfolio);
    };

    var getPortfolio = function getPortfolio() {
      return [portfolio, transactionSubset];
    };

    return {
      getCash: getCash,
      updateCash: updateCash,
      getPortfolio: getPortfolio,
      updatePortfolioData: updatePortfolioData
    };
  }
]);
