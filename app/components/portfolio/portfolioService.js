FG.factory('portfolioService', [
  function() {

    var ownedStocks = {};
    var cash = { dollar: 1000 };

    var getCash = function getCash() {
      return cash;
    };

    var updateCash = function updateCash(amount, type) {
      parseFloat(amount);
      amount = type === 'buy' ? -amount : amount;
      cash.dollar += amount;
    };

    return {
      getCash: getCash,
      updateCash: updateCash
    };
  }
]);
