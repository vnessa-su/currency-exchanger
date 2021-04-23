import { globalEval } from 'jquery';
import ExchangeRateApi from './../src/js/exchange-rate-api.js';

// describe('ExchangeRateApi static methods', () => {
//   it('should return a promise given valid inputs', async () => {
//     // global.fetch = jest.fn().mockImplementationOnce(() => {
//     //   Promise.resolve({
//     //     json: () => Promise.resolve({
//     //       "result": "success",
//     //       "base_code": "EUR",
//     //       "target_code": "GBP",
//     //       "conversion_rate": 0.8412,
//     //       "conversion_result": 5.8884
//     //     }),
//     //   })
//     // });
//     // fetch.mockClear();
//     let exchangeRatePromise = ExchangeRateApi.convertAmountTo("EUR", "GBP", 7);
//     let data;
//     console.log(exchangeRatePromise);
//     exchangeRatePromise.then(function(response){data = response;});
//     expect(fetch).toHaveBeenCalledTimes(1);
//     exepect(data.result).toBe("success");
//   });
// });