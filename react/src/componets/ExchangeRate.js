import React from 'react';
import Currency from './Currency';


function ExchangeRate() {

   return(
    <div id='ExchangeRate'>
        <p>Current Exchange Rate</p>
        <Currency currency='EUR'/>
        <Currency currency='USD'/>
    </div>
   )
}

export default ExchangeRate