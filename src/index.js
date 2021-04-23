import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import $ from 'jquery';
import ExchangeRateApi from './js/exchange-rate-api.js';

$(document).ready(function(){
  populateCurrencies();
  $("#submitAmountButton").click(function(){
    const amount = parseFloat($("#amountInput").val());
    const originalCurrency = $("#originalCurrencySelect").val();
    const targetCurrency = $("#targetCurrencySelect").val();

    $("#inputError").text("");
    $("#errorDisplay").text("");
    if(!amount || amount < 0 || !originalCurrency || !targetCurrency){
      $("#inputError").text("Invalid input");
    }
    
    let exchangeRatePromise = ExchangeRateApi.convertAmountTo(originalCurrency, targetCurrency, amount);
    exchangeRatePromise.then(function(exchangeRateResponse) {
      if(exchangeRateResponse instanceof Error){
        throw Error(`Request ${exchangeRateResponse.message}`);
      }
      ExchangeRateApi.checkForResponseError(exchangeRateResponse);
      displaySingleConversion(amount, exchangeRateResponse);
    })
    .catch(function(error){
      $("#errorDisplay").text(`Conversion Error: ${error.message}`);
      $("#resultsDisplay").html("");
    });
  });
});

function populateCurrencies(){
  let supportedCurrenciesPromise = ExchangeRateApi.getAllSupportedCurrencies();
  supportedCurrenciesPromise.then(function(supportedCurrenciesResponse){
    if(supportedCurrenciesResponse instanceof Error){
      throw Error(`ExchangeRate-API Request Error: ${supportedCurrenciesResponse.message}`);
    }
    ExchangeRateApi.checkForResponseError(supportedCurrenciesResponse);
    return supportedCurrenciesResponse.supported_codes;
  })
  .then(function(currencies){
    currencies.forEach(element => {
      const currencyCode = element[0];
      const currencyTitle = element[1];
      const htmlString = `<option value="${currencyCode}" title="${currencyTitle}">${currencyCode}</option>`;
      $("#originalCurrencySelect").append(htmlString);
      $("#targetCurrencySelect").append(htmlString);
    });
  })
  .catch(function(error){
    $("#errorDisplay").text(`Get Currencies Error: ${error.message}`);
  });
}

function displaySingleConversion(amount, response){
  const originalCode = response.base_code;
  const targetCode = response.target_code;
  const convertedAmount = response.conversion_result.toFixed(2);
  const htmlString = `<p>${amount.toFixed(2)} ${originalCode} &rarr; ${convertedAmount} ${targetCode}</p>`;
  $("#resultsDisplay").html(htmlString);
}