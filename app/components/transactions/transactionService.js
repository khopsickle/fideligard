FG.factory('transactionService', [
  function() {

    // seeded
    // var transactions = {
    //   '2016-01-05': {
    //     'buy': [
    //       {
    //         symbol: 'seededAAPL',
    //         quantity: '10',
    //         price: 94
    //       }
    //     ],
    //     'sell': [
    //       {
    //         symbol: 'seededAAPL',
    //         quantity: '10',
    //         price: 94
    //       }
    //     ]
    //   },
    //   '2016-03-06': {
    //     'buy': [
    //       {
    //         symbol: 'seededAAPL',
    //         quantity: '10',
    //         price: 94
    //       },
    //     ],
    //     'sell': [
    //       {
    //         symbol: 'seededAAPL',
    //         quantity: '10',
    //         price: 94
    //       },
    //     ]
    //   },
    //   '2016-07-06': {
    //     'buy': [
    //       {
    //         symbol: 'seededAAPL',
    //         quantity: '10',
    //         price: 94
    //       },
    //     ],
    //     'sell': [
    //       {
    //         symbol: 'seededAAPL',
    //         quantity: '10',
    //         price: 94
    //       },
    //     ]
    //   },
    //   '2016-09-06': {
    //     'buy': [
    //       {
    //         symbol: 'seededAAPL',
    //         quantity: '10',
    //         price: 94
    //       },
    //     ],
    //     'sell': [
    //       {
    //         symbol: 'seededAAPL',
    //         quantity: '10',
    //         price: 94
    //       },
    //     ]
    //   }
    // };

    // seeded
    var transactions = [
      {
        buySell: "buy",
        date: "2016-01-05",
        price: 12.74,
        quantity: 1,
        symbol: "seededBAC"
      },
      {
        buySell: "buy",
        date: "2016-03-05",
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
      {
        buySell: "sell",
        date: "2016-10-12",
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

      transactions.push(form);
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
