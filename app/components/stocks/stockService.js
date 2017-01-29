FG.factory('stockService',
  ['$http',

    function($http) {

      var stocks = {};
      var stocksArray = [];

      var all = function all() {
        return $http({
          method: 'GET',
          url: '/assets/data/AAPL.json'
        })
        .then(function(response){
          var data = response.data.query.results.quote;
          _scrub(data);
          _toArr(stocks);
          return stocksArray;
        });
      };

      var _scrub = function _scrub(data) {
        for (var i = 0; i < data.length; i++) {
          var stock = data[i];
          if (!stocks[stock['Date']]) {
            stocks[stock['Date']] = {};
          }
          stocks[stock['Date']][stock['Symbol']] = parseFloat(stock['Close']);
        }
      };

      var _toArr = function _toArr(stocksObj) {
        stocksArray.length = 0;
        for (obj in stocksObj) {
          stocksArray.unshift(obj);
        }
      };

      var getStocksArray = function getStocksArray() {
        return stocksArray;
      };

      return {
        all: all,
        getStocksArray: getStocksArray
      };
    }

]);
