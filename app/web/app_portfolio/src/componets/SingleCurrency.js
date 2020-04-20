import React from 'react';

const SingleCurrency = ({item}) => (
    <div>
        <div className='formCurrency'>{item['Realtime Currency Exchange Rate']['1. From_Currency Code']}</div>

    </div>

);

export default SingleCurrency;