FG.controller('StockCtrl', [
  '$scope', 'stockService',
  function($scope, stockService) {
    $scope.currentDateStocks = stockService.getCurrentStocks();
  }
]);
