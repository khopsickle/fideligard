FG.controller('TransactionCtrl', [
  '$scope', 'transactionService', 'dateService',
  function($scope, transactionService, dateService) {
    $scope.transactions = transactionService.getTransactions();

  }
]);
