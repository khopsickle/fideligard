FG.factory('dateService',
  ['stockService', function(stockService) {

    var currentDate = {};

    var setDate = function setDate(date) {
      currentDate.date = date;
    };

    var getDate = function getDate() {
      return currentDate;
    };

    var convertRange = function convertRange(dateIndex) {
      var stocks = stockService.getDatesArray();
      var index = dateIndex || 0;
      return stocks[index];
    };

    var convertDateString = function convertDateString(date) {
      var d = new Date(date);
      d.setDate(d.getDate());
      return d;
    };

    return {
      convertRange: convertRange,
      convertDateString: convertDateString,
      setDate: setDate,
      getDate: getDate
    };
  }]
);
