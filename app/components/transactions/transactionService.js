FG.factory('transactionService', [
  function() {

    var transactions = [
      {
        buySell: "buy",
        date: "2016-01-05",
        price: 12.74,
        quantity: 1,
        symbol: "BAC"
      },
      {
        buySell: "buy",
        date: "2016-03-05",
        price: 12.74,
        quantity: 1,
        symbol: "BAC"
      },
      {
        buySell: "buy",
        date: "2016-07-10",
        price: 94,
        quantity: 12,
        symbol: "AAPL"
      },
      {
        buySell: "sell",
        date: "2016-07-12",
        price: 94,
        quantity: 4,
        symbol: "AAPL"
      },
      {
        buySell: "sell",
        date: "2016-10-12",
        price: 94,
        quantity: 4,
        symbol: "AAPL"
      },
    ];

    var addTransaction = function addTransaction(form) {
      var newTransaction = {
        symbol: form.symbol,
        buySell: form.buySell,
        quantity: form.quantity,
        date: form.date,
        price: form.price
      };

      transactions.push(newTransaction);
    };

    var getTransactions = function getTransactions() {
      return transactions;
    };

    return {
      addTransaction: addTransaction,
      getTransactions: getTransactions,
    };
  }
]);
