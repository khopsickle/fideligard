FG.controller('StockCtrl', [
  '$scope', 'stockService', 'dateService', 'tradeService',
  function($scope, stockService, dateService, tradeService) {
    $scope.currentDateStocks = stockService.getCurrentStocks();
    $scope.currentDate = dateService.getDate(); // currentDate.date

    $scope.setTradeStock = function setTradeStock(symbol) {
      tradeService.setSymbol(symbol);
    };

    $scope.$watch('currentDate.date', function() {
      stockService.updateStocks($scope.currentDate.date);
    });
  }

]);
