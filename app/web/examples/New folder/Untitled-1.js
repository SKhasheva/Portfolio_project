


   fetch('https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=ILS&apikey=PA9D235Y6KPZ46HS')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
        })
      .catch((error) => console.log(error));
  