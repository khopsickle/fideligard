FG.factory('transactionService', [
  function() {

    // seeded
    var transactions = {
      '2016-07-05': {
        'buy': [
          {
            symbol: 'seededAAPL',
            quantity: '10',
            price: 94
          },
          {
            symbol: 'seededAAPL',
            quantity: '10',
            price: 94
          },
        ],
        'sell': [
          {
            symbol: 'seededAAPL',
            quantity: '10',
            price: 94
          },
          {
            symbol: 'seededAAPL',
            quantity: '10',
            price: 94
          }
        ]
      },
      '2016-07-06': {
        'buy': [
          {
            symbol: 'seededAAPL',
            quantity: '10',
            price: 94
          },
          {
            symbol: 'seededAAPL',
            quantity: '10',
            price: 94
          },
        ],
        'sell': [
          {
            symbol: 'seededAAPL',
            quantity: '10',
            price: 94
          },
          {
            symbol: 'seededAAPL',
            quantity: '10',
            price: 94
          }
        ]
      }
    };

    // seeded
    var formattedTransactions = [
      {
        buySell: "buy",
        date: "2016-07-05",
        price: 12.74,
        quantity: 1,
        symbol: "seededBAC"
      },
      {
        buySell: "buy",
        date: "2016-07-05",
        price: 12.74,
        quantity: 1,
        symbol: "seededBAC"
      },
      {
        buySell: "sell",
        date: "2016-07-12",
        price: 94,
        quantity: 4,
        symbol: "seededAAPL"
      },
    ];

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

      // view formatted
      formattedTransactions.push(form);
      console.log(formattedTransactions);
    };

    var getFormattedTransactions = function getFormattedTransactions() {
      return formattedTransactions;
    };

    var getTransactions = function getTransactions() {
      return transactions;
    };

    return {
      addTransaction: addTransaction,
      getTransactions: getTransactions,
      getFormattedTransactions: getFormattedTransactions
    };
  }
]);
