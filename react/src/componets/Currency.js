
import React, { Component} from 'react';

class Currency extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exchangeRate: []
        };
      }

componentDidMount() {
    const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${this.props.currency}&to_currency=ILS&apikey=PA9D235Y6KPZ46HS`;

    fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      this.setState({
        exchangeRate: data["Realtime Currency Exchange Rate"]
      })
    })
    .catch((error) => console.log(error));
    }

render() {
    return (
        <div className='ExchangeRate'>
            <br />
            <br />
            <table >
                <tr>
                    <th>Last update time</th>
                    <td>{this.state.exchangeRate["6. Last Refreshed"]}</td>
                </tr>
                <tr>
                    <th>1 {this.state.exchangeRate['1. From_Currency Code']}</th>
                    <td>{this.state.exchangeRate['5. Exchange Rate']} ILS</td>
                </tr>
            </table>        
            <br />   
        </div> 
        )
    }
}


 

export default Currency;