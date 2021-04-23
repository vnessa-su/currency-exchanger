import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import $ from 'jquery';
import ExchangeRateApi from './js/exchange-rate-api.js';

$(document).ready(function(){
  $("#submitAmountButton").click(function() {
    const amount = parseFloat($("#amountInput").val());
    let exchangeRatePromise = ExchangeRateApi.convertAmountTo("EUR", "GBP", amount);
    exchangeRatePromise.then(function(exchangeRateResponse) {
      if(exchangeRateResponse instanceof Error){
        throw Error(`ExchangeRate-API error: ${exchangeRateResponse.message}`);
      }
      console.log(exchangeRateResponse);
    })
    .catch(function(error) {
      $("#errorDisplay").text(error);
    });
  });
});