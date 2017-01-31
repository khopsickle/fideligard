FG.factory('dateService',
  ['stockService', function(stockService) {

    var currentDate = {};

    var setDate = function setDate(date) {
      currentDate.date = date;
    };

    var getDate = function getDate() {
      return currentDate;
    };

    var convertRange = function(dateIndex) {
      var stocks = stockService.getDatesArray();
      var index = dateIndex || 0;
      return stocks[index];
    };

    return {
      convertRange: convertRange,
      setDate: setDate,
      getDate: getDate
    };
  }]
);
