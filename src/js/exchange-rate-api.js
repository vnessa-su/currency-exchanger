export default class ExchangeRateApi{
  static convertAmountTo(originalCurrency, targetCurrency, amount){
    const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${originalCurrency}/${targetCurrency}/${amount}`;
    return fetch(url)
      .then(function(response){
        const dataFromResponse = this.checkForResponseErrors(response);
        return dataFromResponse;
      })
      .catch(function(error){
        return Error(error);
      });
  }

  static checkForResponseErrors(response){
    const data = response.json();
    if(!response.ok){
      throw Error(response.statusText);
    }
    if(data.result === "error"){
      const errorType = data["error-type"];
      switch(errorType){
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
    return data;
  }
}