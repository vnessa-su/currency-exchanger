export default class ExchangeRateApi{
  static convertAmountTo(originalCurrency, targetCurrency, amount){
    const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${originalCurrency}/${targetCurrency}/${amount}`;
    return fetch(url)
      .then(function (response) {
        if(!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function (error) {
        return Error(error);
      });
  }
}