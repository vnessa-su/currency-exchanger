export default class ExchangeRateApi {
  static convertAmountTo(originalCurrency, targetCurrency, amount) {
    const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${originalCurrency}/${targetCurrency}/${amount}`;
    return fetch(url)
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function (error) {
        return Error(error);
      });
  }

  static getAllSupportedCurrencies() {
    const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/codes`;
    return fetch(url)
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function (error) {
        return Error(error);
      });
  }

  static getAllConversionRates(targetCurrency) {
    const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${targetCurrency}`;
    return fetch(url)
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function (error) {
        return Error(error);
      });
  }

  static convertAmountToAllCurrencies(amount, conversionRatesMap) {
    if (!amount || amount < 0) {
      throw Error(`Invalid Amount Input - needs to be a number greater than 0`);
    } else {
      let convertedAmountMap = new Map();
      conversionRatesMap.forEach(function (conversionRate, currency) {
        const convertedAmount = conversionRate * amount;
        convertedAmountMap.set(currency, convertedAmount);
      });
      return convertedAmountMap;
    }
  }

  static checkForResponseError(data) {
    if (data.result === "error") {
      const errorType = data["error-type"];
      switch (errorType) {
        case "unsupported-code":
          throw Error("Unsupported Currency Code");
        case "malformed-request":
          throw Error("Malformed Request URL");
        case "invalid-key":
          throw Error("API Key is Invalid");
        case "inactive-account":
          throw Error("Inactive Account");
        case "quota-reached":
          throw Error("Request Limit Reached");
        default:
          throw Error("Unknown Error");
      }
    }
  }
}
