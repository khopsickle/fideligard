FG.controller('StockCtrl', [
  '$scope', 'stockService', 'dateService',
  function($scope, stockService, dateService) {
    $scope.currentDateStocks = stockService.getCurrentStocks();
    $scope.currentDate = dateService.getDate(); // currentDate.date

    $scope.$watch('currentDate.date', function() {
      stockService.updateStocks($scope.currentDate.date);
    });
  }

]);
