# Currency Exchanger

#### Converts an amount from one currency to another and calls the ExchangeRate API.

#### To see my live website go to [https://vnessa-su.github.io/currency-exchanger/](https://vnessa-su.github.io/currency-exchanger/)

#### By Vanessa Su

## Description

A user is able to input an amount, select the currency and then convert it into another selected currency or convert into all available currencies. This application calls the [ExchangeRate API](https://www.exchangerate-api.com/) to calculate the conversion, get conversion rates, and populate the list of available currencies.

## User Story

* Input an amount
* Choose the currency of the amount
* Choose the currency to convert to
* Press the `Convert` button to convert amount to target currency
* Press the `Conver to All Currencies` button to convert to all available currencies
* Display the original amount and currency, as well as the converted amount and currency
* Display any input, API fetch, and response errors
* Press the `Clear Form` to clear the form and any displayed information

## Technologies Used

* HTML
* CSS
* JavaScript
* Node
* VSCode
* Webpack
* ExchangeRate-API

## Setup/Installation Requirements

### Prerequisites
* [Node](https://nodejs.org/en/)
* A text editor like [VS Code](https://code.visualstudio.com/)
* ExchangeRate-API key

### Installation
1. Clone the repository: `$ git clone https://github.com/vnessa-su/currency-exchanger.git`
2. Navigate to the `/currency-exchanger` directory on your computer
3. Open with your preferred text editor to view the code base
4. To start a development server and view the project in the browser:
    * Navigate to `/currency-exchanger` in your command line
    * Run the command `npm install` to install dependencies
    * Optionally, run the commmand `npm run build` to make a bundle of the files
    * Finally, run the command `npm run start` to start a development server
5. To run tests, navigate to `currency-exchanger` in your terminal and run the command `npm run test`

### Obtain API key
1. Go to [ExchangeRate-API](https://www.exchangerate-api.com/) website
2. Enter in your email address and press the `Get Free Key` button
3. Enter in a password for you account and press the `Accept Terms & Create API Key!` button
4. `Your API Key` will be displayed in the `API Access` section
5. Create a .env file in the `/currency-exchanger` directory
6. Open the .env file in your text editor
7. Add `API_KEY={Your API Key Here}` to the file, replacing `{Your Api Key Here}` with the API key found in step 4

## Known Bugs

_No known bugs_

## Contact Information

For any questions or comments, please reach out through GitHub.

## License

[MIT License](license)

Copyright (c) 2021 Vanessa Su