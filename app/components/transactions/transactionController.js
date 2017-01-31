FG.controller('TransactionCtrl', [
  '$scope', 'transactionService',
  function($scope, transactionService) {
    $scope.transactions = transactionService.getTransactions();
  }
]);
