FG.factory('transactionService', [
  function() {

    var transactions = {};

    var model = {
      '2016-07-05': {
        'bought': [
          {
            symbol: 'AAPL',
            quantity: '10',
            price: 94
          },
          {
            symbol: 'AAPL',
            quantity: '10',
            price: 94
          },
        ],
        'sold': [
          {
            symbol: 'AAPL',
            quantity: '10',
            price: 94
          },
          {
            symbol: 'AAPL',
            quantity: '10',
            price: 94
          }
        ]
      }
    };

    var addTransaction = function addTransaction(form) {
      var newTransaction = {
        symbol: form.symbol,
        quantity: form.quantity,
        price: form.price
      };

      if (!transactions[form.date]) {
        transactions[form.date] = {
          'buy': [],
          'sell': []
        };
      }

      transactions[form.date][form.buySell].push(newTransaction);

      console.log(transactions);
    };

    var getTransactions = function getTransactions() {
      return transactions;
    };

    return {
      addTransaction: addTransaction,
      getTransactions: getTransactions
    };
  }
]);
