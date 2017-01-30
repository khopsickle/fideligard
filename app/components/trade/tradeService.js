FG.factory('tradeService',
  ['stockService', 'portfolioService',

    function(stockService, portfolioService) {

      var tradeForm = {};

      var currentStocks = stockService.getCurrentStocks();

      var updateTradeForm = function updateTradeForm(date, symbol, quantity, buySell) {
        tradeForm.symbol = symbol;
        tradeForm.date = date;
        tradeForm.price = currentStocks[symbol]['today'];
        tradeForm.quantity = quantity;
        tradeForm.buySell = buySell;
      };

      var getTradeForm = function getTradeForm() {
        return tradeForm;
      };

      var validForm = function validForm(form) {
        if (_allFields(form) && _buySellValidation(form)) {
          console.log('all validations passed');
          return true;
        } else {
          return false;
        }
      };

      // the form has all fields
      var _allFields = function _allFields(form) {
        return (form.symbol && form.buySell && form.quantity);
      };

      var _buySellValidation = function _buySellValidation(form) {
        if (form.buySell === 'buy') {
          // buying: the price does not exceed current cash
          var currentCash = portfolioService.getCash();
          return (currentCash >= (form.price * form.quantity));
        } else if (form.buySell === 'sell') {
          // selling: the quantity does not exceed current stock
          var currentStock = 10;
          return (currentStock >= form.quantity);
        }
        return true;
      };



      return {
        updateTradeForm: updateTradeForm,
        getTradeForm: getTradeForm,
        validForm: validForm
      };
    }
  ]
);
