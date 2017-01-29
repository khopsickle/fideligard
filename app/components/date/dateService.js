FG.factory('dateService',
  ['stockService', function(stockService) {

    var convertRange = function(dateIndex) {
      var stocks = stockService.getStocksArray();
      var index = dateIndex || 0;
      return stocks[index];
    };

    return {
      convertRange: convertRange
    };
  }]
);
