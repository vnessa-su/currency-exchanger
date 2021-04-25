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

    clearErrorDisplays();
    checkAmountFormInput(amount, originalCurrency);
    if(!targetCurrency){
      $("#targetCurrencySelect").addClass("is-invalid");
    }
    
    let singleConversionPromise = ExchangeRateApi.convertAmountTo(originalCurrency, targetCurrency, amount);
    singleConversionPromise.then(function(singleConversionResponse) {
      if(singleConversionResponse instanceof Error){
        throw Error(`Request ${singleConversionResponse.message}`);
      }
      ExchangeRateApi.checkForResponseError(singleConversionResponse);
      displaySingleConversion(amount, singleConversionResponse);
    })
    .catch(function(error){
      $("#errorDisplay").text(`Conversion Error: ${error.message}`);
      $("#resultsDisplay").html("");
    });
  });

  $("#convertToAllButton").click(function(){
    const amount = parseFloat($("#amountInput").val());
    const originalCurrency = $("#originalCurrencySelect").val();

    clearErrorDisplays();
    checkAmountFormInput(amount, originalCurrency);

    let allConversionRatesPromise = ExchangeRateApi.getAllConversionRates(originalCurrency);
    allConversionRatesPromise.then(function(conversionRatesResponse){
      if(conversionRatesResponse instanceof Error){
        throw Error(`Request ${conversionRatesResponse.message}`);
      }
      ExchangeRateApi.checkForResponseError(conversionRatesResponse);
      console.log(conversionRatesResponse.conversion_rates);
    })
    .catch(function(error){
      $("#errorDisplay").text(`All Currencies Conversion Error: ${error.message}`);
      $("#resultsDisplay").html("");
    });
  });

  $("#clearFormButton").click(function(){
    clearErrorDisplays();
    $("#amountInput").val("");
    $("#originalCurrencySelect").val("");
    $("#targetCurrencySelect").val("");
    $("#resultsDisplay").html("");
  });

  $("#amountInput").focus(function(){
    this.select();
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

function clearErrorDisplays(){
  $("#amountInput").removeClass("is-invalid");
  $("#amountInput").removeClass("text-danger");
  $("#originalCurrencySelect").removeClass("is-invalid");

  $("#targetCurrencySelect").removeClass("is-invalid");

  $("#errorDisplay").text("");
}

function checkAmountFormInput(amountInput, currencyInput){
  if(!amountInput || amountInput < 0){
    $("#amountInput").val("Invalid Amount");
    $("#amountInput").addClass("is-invalid");
    $("#amountInput").addClass("text-danger");
  }
  if(!currencyInput){
    $("#originalCurrencySelect").addClass("is-invalid");
  }
}

function displaySingleConversion(amount, response){
  const originalCode = response.base_code;
  const targetCode = response.target_code;
  const convertedAmount = response.conversion_result.toFixed(2);
  const htmlString = `<p>${amount.toFixed(2)} ${originalCode} &rarr; ${convertedAmount} ${targetCode}</p>`;
  $("#resultsDisplay").html(htmlString);
}