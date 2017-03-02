FG.controller('PortfolioCtrl', [
  '$scope', 'portfolioService', 'dateService', 'stockService',
  function($scope, portfolioService, dateService, stockService) {
    $scope.currentDate = dateService.getDate(); // currentDate.date
    $scope.currentPortfolio = portfolioService.getPortfolio()[0];
    $scope.currentSubset = portfolioService.getPortfolio()[1];
    $scope.currentStock = stockService.getCurrentStocks();

    $scope.$watch('currentDate.date', function() {
      portfolioService.updatePortfolioData($scope.currentDate.date);
    });
  }
]);
