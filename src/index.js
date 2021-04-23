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
        throw Error(`ExchangeRate-API error: ${exchangeRateResponse.message}`);
      } else if(exchangeRateResponse.result === "error"){
        throw Error(`ExchangeRate-API error: ${exchangeRateResponse["error-type"]}`);
      }
      displaySingleConversion(amount, exchangeRateResponse);
    })
    .catch(function(error){
      $("#errorDisplay").text(error.message);
      $("#resultsDisplay").html("")
    });
  });
});

function populateCurrencies(){
  const currencies = [
    ["USD", "United States Dollar", "&#36;"], 
    ["EUR", "Euro - European Union", "&#8364;"], 
    ["GBP", "Pound Sterling - United Kingdom", "&#163;"], 
    ["CNY", "Chinese Renminbi", "&#20803;"], 
    ["JPY", "Japanese Yen", "&#165;"], 
    ["KRW", "South Korean Won", "&#8361;"], 
    ["AUD", "Australian Dollar", "&#36;"]
  ];

  currencies.forEach(element => {
    const currencyCode = element[0];
    const currencyTitle = element[1];
    // const currencySymbol = element[2];
    const htmlString = `<option value="${currencyCode}" title="${currencyTitle}">${currencyCode}</option>`;
    $("#originalCurrencySelect").append(htmlString);
    $("#targetCurrencySelect").append(htmlString);
  });
}

function displaySingleConversion(amount, response){
  const originalCode = response.base_code;
  const targetCode = response.target_code;
  const convertedAmount = response.conversion_result.toFixed(2);
  const htmlString = `<p>${amount.toFixed(2)} ${originalCode} &rarr; ${convertedAmount} ${targetCode}</p>`;
  $("#resultsDisplay").html(htmlString);
}