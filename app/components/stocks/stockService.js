FG.factory('stockService',
  ['$http', '$q',

    function($http, $q) {

      var stocks = {};
      var datesArray = [];
      var currentStocks = {};

      var companies = ['AAPL', 'BAC', 'DB', 'F', 'GE', 'TWTR', 'JPM', 'XOM', 'VZ'];

      var all = function all() {
        var requestList = [];
        // iterate thru companies and build http queries in an array
        for (var i = 0; i < companies.length; i++) {
          requestList.push(_getRequest(companies[i]));
        }
        return $q.all(requestList).then(function(response) {
          // clear existing array on new request
          datesArray.length = 0;
          // parse all the data returned from requestList
          for (var i = 0; i < response.length; i++) {
            var data = response[i].data.query.results.quote;
            _scrub(data);
          }
          _toArr(stocks);

          // return all the data to the resolve in routes
          return datesArray;
        });
      };

      var _getRequest = function _getRequest(company) {
        return $http({
          method: 'GET',
          url: 'http://query.yahooapis.com/v1/public/yql?q=%20select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20=%22' + company + '%22%20and%20startDate%20=%20%222015-12-01%22%20and%20endDate%20=%20%222016-12-31%22%20&format=json%20&diagnostics=true%20&env=store://datatables.org/alltableswithkeys%20&callback='
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
        for (obj in stocksObj) {
          datesArray.unshift(obj);
        }
      };

      var getDatesArray = function getDatesArray() {
        return datesArray;
      };

      var updateStocks = function updateStocks(date) {
        for (var i = 0; i < companies.length; i++) {
          var symbol = companies[i];
          var currentDayPrice = stocks[date][symbol];
          var symbolInfo = {
            today: currentDayPrice,
            oneDay: currentDayPrice - _getStockOnDate(date, symbol, 1),
            sevenDay: currentDayPrice - _getStockOnDate(date, symbol, 7),
            thirtyDay: currentDayPrice - _getStockOnDate(date, symbol, 30),
          };
          currentStocks[symbol] = symbolInfo;
        }
      };

      var _getStockOnDate = function _getStockOnDate(date, symbol, difference) {
        // refactor to use dateService string converting method
        var d = new Date(date);
        d.setDate(d.getDate() - difference);
        var dFormated = d.toISOString().slice(0, 10);

        // return the stock price on the date in the past
        if (stocks[dFormated]) {
          return stocks[dFormated][symbol];
        } else {
          // for dates in the past that don't have closing prices, just return the current day's price
          // should probably return the last close price from a previous day (going back until you hit a day that has a price)
          return stocks[date][symbol];
        }
      };

      var getCurrentStocks = function getCurrentStocks() {
        return currentStocks;
      };

      var getCompanies = function getCompanies() {
        return companies;
      };

      return {
        all: all,
        getDatesArray: getDatesArray,
        updateStocks: updateStocks,
        getCurrentStocks: getCurrentStocks,
        getCompanies: getCompanies
      };
    }

]);
