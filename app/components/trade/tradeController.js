FG.controller('TradeCtrl', [
  '$scope', 'portfolioService', 'dateService', 'stockService', 'tradeService', 'transactionService', '$stateParams',
  function($scope, portfolioService, dateService, stockService, tradeService, transactionService, $stateParams) {
    $scope.companies = stockService.getCompanies();
    $scope.cash = portfolioService.getCash();

    $scope.currentDate = dateService.getDate();
    $scope.currentStocks = stockService.getCurrentStocks();

    $scope.tradeForm = {};

    if ($stateParams.symbol) {
      $scope.tradeForm.symbol = $stateParams.symbol;
    } else {
      $scope.tradeForm.symbol = $scope.companies[0];
    }

    // watches for any changes on the form or in portfolio cash and revalidates
    $scope.$watchGroup(['currentDate.date', 'trade.symbol', 'trade.buySell', 'trade.quantity', 'cash.dollar'], function() {

      $scope.tradeForm.date = $scope.currentDate.date;
      $scope.tradeForm.price = $scope.currentStocks[$scope.tradeForm.symbol]['today'];
      $scope.tradeForm.quantity = $scope.trade.quantity;
      $scope.tradeForm.buySell = $scope.trade.buySell;

      $scope.validForm = tradeService.validForm($scope.tradeForm);
    });

    $scope.addTransaction = function addTransaction(formData) {
      transactionService.addTransaction(formData);
      portfolioService.updateCash(formData.price * formData.quantity, formData.buySell);
    };
  }
]);
