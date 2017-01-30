FG.factory('stockService',
  ['$http', '$q',

    function($http, $q) {

      var stocks = {};
      var stocksArray = [];
      var currentStocks = {};

      var companies = ['AAPL', 'BAC', 'DB', 'F', 'GE', 'TWTR', 'JPM', 'XOM', 'VZ'];

      var all = function all() {
        var requestList = [];
        // iterate thru companies and build http queries in an array
        for (var i = 0; i < companies.length; i++) {
          requestList.push(_getRequest(companies[i]));
        }
        return $q.all(requestList).then(function(response) {
          // clear exisitng array on new request
          stocksArray.length = 0;

          // parse all the data returned from requestList
          for (var i = 0; i < response.length; i++) {
            var data = response[i].data.query.results.quote;
            _scrub(data);
            _toArr(stocks);
          }

          // return all the data to the resolve in routes
          return stocksArray;
        });
      };

      var _getRequest = function _getRequest(company) {
        return $http({
          method: 'GET',
          url: '/assets/data/' + company + '.json'
        });
        // .then(function(response){
        //   var data = response.data.query.results.quote;
        //   _scrub(data);
        //   stocksArray.length = 0;
        //   _toArr(stocks);
        //   return stocksArray;
        // });
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
        for (obj in stocksObj) {
          stocksArray.unshift(obj);
        }
      };

      var getStocksArray = function getStocksArray() {
        return stocksArray;
      };

      var updateStocks = function updateStocks(date) {
        angular.copy(stocks[date], currentStocks);
      };

      var getCurrentStocks = function getCurrentStocks() {
        return currentStocks;
      };

      return {
        all: all,
        getStocksArray: getStocksArray,
        updateStocks: updateStocks,
        getCurrentStocks: getCurrentStocks
      };
    }

]);
