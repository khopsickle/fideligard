FG.controller('DateCtrl', [
  '$scope', 'stocks', 'dateService', 'stockService',
  function($scope, stocks, dateService, stockService) {
    $scope.stocks = stocks;

    // setup for date slider
    $scope.max = $scope.stocks.length - 1;
    $scope.badMagicNumber = 22;
    $scope.startDate = $scope.stocks[$scope.badMagicNumber];
    $scope.endDate = $scope.stocks[$scope.max];

    // selected date info, updates when the slider changes
    $scope.$watch('dateIndex', function() {
      $scope.currentDate = dateService.convertRange($scope.dateIndex);
      dateService.setDate($scope.currentDate);
    });
  }
]);
