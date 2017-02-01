FG.controller('PortfolioCtrl', [
  '$scope', 'portfolioService', 'dateService',
  function($scope, portfolioService, dateService) {
    $scope.currentDate = dateService.getDate(); // currentDate.date
    $scope.currentPortfolio = portfolioService.getPortfolio()[0];
    $scope.currentSubset = portfolioService.getPortfolio()[1];

    $scope.$watch('currentDate.date', function() {
      portfolioService.updatePortfolioData($scope.currentDate.date);
    });
  }
]);
