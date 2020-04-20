
import React, { Component, useEffect } from 'react';
//import SingleCurrency from './SingleCurrency';

/*


function setCurrency(currency, arr) {
    const url = 'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency='+currency+'&to_currency=ILS&apikey=PA9D235Y6KPZ46HS'

        fetch(url).then((response) => {
          return response.json();
        }).then((data) => {
          this.setState({
            array: data["Realtime Currency Exchange Rate"]
          })
        })
        .catch((error) => console.log(error));
        
    return arr
};

function Currency() {
    const [currEUR, setCurrencyEUR] = useState([]);
    const [currUSD, setCurrencyUSD] = useState([]);

    useEffect(() => {
        setCurrencyEUR(setCurrency('EUR', currEUR));
        setCurrencyUSD(setCurrency('USD', currUSD));
    }

    return 

}

*/



class Currency extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currency: [],
        };
      }
    

componentDidMount() {
    const url = 'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=ILS&apikey=PA9D235Y6KPZ46HS';

    fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      this.setState({
        currency: data["Realtime Currency Exchange Rate"]
      })
    })
    .catch((error) => console.log(error));
    }

render() {
    return (
        <div>
            <br />
            <p>ffffffffffffffffffff</p>
            <br />
            {this.state.currency['1. From_Currency Code']}
            {this.state.currency['5. Exchange Rate']}
            <br />
            {this.state.currency["6. Last Refreshed"]}
        </div> 
        )
    }
}


 

export default Currency;