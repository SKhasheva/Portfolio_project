import React from 'react';
import Media from 'react-media';
import finance_index from './finance_index.jpg';
import finance_index_small from './finance_index_small.jpg';

function Header() {
    return (

        <Media query={{ maxWidth: 800 }}>
        {matches =>
          matches ? (
            <picture><img src={finance_index_small} alt="Finance market" /></picture>
          ) : (
            <picture><img src={finance_index} alt="Finance market" /></picture>
          )
        }
      </Media> 
    )
}

export default Header;