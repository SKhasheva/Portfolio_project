
import React, { useState }  from 'react';
import './css/App.css';
import ChartGoogle from './componets/ChartGoogle';
import Currency from './componets/Currency';
import DetailedPortfolio from './componets/DetailedPortfolio';
//import Data from './componets/Data';



function App() {


  const[isHome, setHome] = useState(<div></div>);
  const [isChartGoogle, setChartGoogle] = useState(<div></div>);
  const [isDetails, setDetails] = useState(<div></div>);
  


  function showHome() {
    setHome(<div>
                <Currency currency='EUR'/>
                <Currency currency='USD'/>
            </div>);
    setChartGoogle(<div></div>);
    setDetails(<div></div>)
  } 
  

 /* function showHome() {
  setHome(<div>
              rrrrrr
          </div>);
  setChartGoogle(<div></div>);
} */

  function showChartGoogle() {
    setChartGoogle(<ChartGoogle />);
    setHome(<div></div>);
    setDetails(<div></div>)
  }


  function showDetails() {
    setChartGoogle(<div></div>);
    setHome(<div></div>);
    setDetails(<DetailedPortfolio />)
    //console.log(new Data().render())
  }

  return (
    <div>
     <header id="grid">
        <nav>
            <a href="" id="menu-icon"></a>
            <ul>
                <li></li>
                <li>
                    <a href="#Home" onClick={showHome}>Home</a>
                </li>
                <li></li>
                <li>
                    <a href="#Chart" onClick={showChartGoogle}>Chart</a>
                </li>
                <li></li>
                <li>
                    <a href="#Details" onClick={showDetails}>Details</a>
                </li>
                <li></li>
                <li>
                    <a href="#">Contact</a>
                </li>
                
            </ul>
        </nav>
        
      </header> 
      <br />
      {isHome}
      {isChartGoogle}
      {isDetails} 
    
    </div>
  )

}

export default App;



  



/*
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/


