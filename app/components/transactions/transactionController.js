FG.controller('TransactionCtrl', [
  '$scope', 'transactionService', 'dateService',
  function($scope, transactionService, dateService) {
    $scope.currentDate = dateService.getDate(); // currentDate.date
    $scope.transactions = transactionService.getFormattedTransactions();

  }
]);
