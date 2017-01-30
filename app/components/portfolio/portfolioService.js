FG.factory('portfolioService', [
  function() {

    var ownedStocks = {};
    var cash = 1000;

    var getCash = function getCash() {
      return cash;
    };

    return {
      getCash: getCash
    };
  }
]);
