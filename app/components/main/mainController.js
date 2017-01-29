FG.controller('MainCtrl', [
  '$scope', 'stocks', 'dateService',
  function($scope, stocks, dateService) {
    $scope.stocks = stocks;
    $scope.max = $scope.stocks.length - 1;
    $scope.currentDate;
    $scope.badMagicNumber = 22;
    $scope.startDate = $scope.stocks[$scope.badMagicNumber];
    $scope.endDate = $scope.stocks[$scope.max];

    $scope.$watch('dateIndex', function() {
      $scope.currentDate = dateService.convertRange($scope.dateIndex);
    });
  }
]);
