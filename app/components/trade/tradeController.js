FG.controller('TradeCtrl', [
  '$scope', 'portfolioService', 'dateService', 'stockService', 'tradeService',
  function($scope, portfolioService, dateService, stockService, tradeService) {
    $scope.companies = stockService.getCompanies();
    $scope.cash = portfolioService.getCash();

    $scope.currentDate = dateService.getDate();

    $scope.tradeForm = tradeService.getTradeForm();

    // dateService.getDate is an object to preserve the value when dateController passes it to the dateService
    $scope.$watchGroup(['currentDate.date', 'trade.symbol', 'trade.buySell', 'trade.quantity'], function() {
      tradeService.updateTradeForm(
        $scope.currentDate.date,
        $scope.trade.symbol,
        $scope.trade.quantity,
        $scope.trade.buySell
      );

      $scope.validForm = tradeService.validForm($scope.tradeForm);
      console.log($scope.validForm);
    });
  }
]);
