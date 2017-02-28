FG.factory('portfolioService',
  ['transactionService', 'dateService',
  function(transactionService, dateService) {

    var cash = { dollar: 1000 };
    var transactionSubset = {};
    var portfolio = {};

    var transactions = {
      '2016-01-05': [
        {
          symbol: 'seededAAPL',
          buySell: 'buy',
          quantity: '10',
          price: 94
        },
        {
          symbol: 'seededAAPL',
          buySell: 'sell',
          quantity: '10',
          price: 94
        }
      ]
    };

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
        var stock = transactions[i].symbol;
        var iterationDate = dateService.convertDateString(stockDate);
        // break out of loop when we're past given date
        if (iterationDate > currentDate) { break; }

        // otherwise add the stock to the transactionSubset
        if (!newPortfolio[stock]) {
          newPortfolio[stock] = [];
        }
        newPortfolio[stock].push(transactions[i]);
      }

      angular.copy(newPortfolio, transactionSubset);
      recalcPortfolio();
    };

    var recalcPortfolio = function recalcPortfolio() {
      var totals = {};

      for (transactionStock in transactionSubset) {
        var calculations = {
          quantity: 0,
        };

        var transObj = transactionSubset[transactionStock];
        for (var i = 0; i < transObj.length; i++) {
          if (transObj[i]['buySell'] === 'buy') {
            calculations.quantity += transObj[i]['quantity'];
          } else {
            calculations.quantity -= transObj[i]['quantity'];
          }
        }

        totals[transactionStock] = calculations;
        console.log(totals);
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
