FG.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('');

  $stateProvider
    .state('main', {
      url: '',
      views: {
        'stocks': {
          templateUrl: 'app/components/stocks/stocks.html',
          controller: 'StockCtrl'
        },
        'date': {
          templateUrl: 'app/components/date/date.html',
          controller: 'DateCtrl'
        }
      },
      resolve: {
        stocks: function(stockService) {
          return stockService.all();
        }
      }
    })
    .state('main.portfolio', {
      url: '/portfolio',
      views: {
        'content@': {
          templateUrl: 'app/components/portfolio/portfolio.html'
        }
      }
    })
    .state('main.trade', {
      url: '/trade',
      views: {
        'content@': {
          templateUrl: 'app/components/trade/trade.html',
          controller: 'TradeCtrl'
        }
      }
    })
    .state('main.transactions', {
      url: '/transactions',
      views: {
        'content@': {
          templateUrl: 'app/components/transactions/transactions.html'
        }
      }
    })

})
