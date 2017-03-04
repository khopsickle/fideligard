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

    var updatePortfolioData = function getTransactions(date) {
      var transactions = transactionService.getTransactions();
      var newPortfolio = {};
      var currentDate = dateService.convertDateString(date);

      for (var i = 0; i < transactions.length; i++) {
        var stockDate = transactions[i].date;
        var stock = transactions[i].symbol;
        var iterationDate = dateService.convertDateString(stockDate);

        if (iterationDate > currentDate) { break; }

        // otherwise add the stock to the transactionSubset
        if (!newPortfolio[stock]) {
          newPortfolio[stock] = [];
        }

        newPortfolio[stock].push(transactions[i]);
      }

      angular.copy(newPortfolio, transactionSubset);
      _recalcPortfolio();
    };

    var _recalcPortfolio = function _recalcPortfolio() {
      var totals = {};

      for (transactionStock in transactionSubset) {
        var calculations = {
          quantity: 0,
          costBasis: 0
        };

        var transObj = transactionSubset[transactionStock];
        for (var i = 0; i < transObj.length; i++) {
          if (transObj[i]['buySell'] === 'buy') {
            calculations.quantity += transObj[i]['quantity'];
            calculations.costBasis += transObj[i]['quantity'] * transObj[i]['price'];
          } else {
            calculations.quantity -= transObj[i]['quantity'];
            calculations.costBasis -= transObj[i]['quantity'] * transObj[i]['price'];
          }
        }

        totals[transactionStock] = calculations;
      }

      angular.copy(totals, portfolio);
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
