
import React, { useState }  from 'react';
/*import ReactDOM from 'react-dom';
/* import './index.css';
import App from './App'; */
import './style_reprospective.css';
import Header from './Header';
import Chart from './Chart';
import ChartGoogle from './ChartGoogle';
//import Test from ''''


function App() {

 /* function showAccount() {
    setRestorspective(Test())
    //return(<div>ttt</div>)
  }
  */

  const[isHome, setHome] = useState(<div></div>);
  const [isChart, setChart] = useState(<div></div>);
  const [isChartGoogle, setChartGoogle] = useState(<div></div>);
  

  function showChart() {
    setChart(<Chart />);
    setChartGoogle(<div></div>);
  //  return (<div>rrr</div>);
  }

  function showHome() {
    setHome(<p>Home</p>);
    setChart(<div></div>);
    setChartGoogle(<div></div>);
  }

  function showChartGoogle() {
    setChartGoogle(<ChartGoogle />);
    setChart(<div></div>);
  //  return (<div>rrr</div>);
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
                    <a href="#Chart" onClick={showChart}>Portfolio Chart</a>
                </li>
                <li></li>
                <li>
                    <a href="#Details" onClick={showChartGoogle}>Details</a>
                </li>
                <li></li>
                <li>
                    <a href="#">Contact</a>
                </li>
                
            </ul>
        </nav>
        
      </header> 
      <div></div>
      {isHome}
      {isChart}
      {isChartGoogle} 
    
    </div>
  )

}

export default App;


/*

      <br />
      <button onClick={()=> showAccount()}>Btn1</button>
      <br />
      <button onClick={()=> <p>Hello!</p>}>Btn2</button>
      <br />
      {isRetrospective}


   

  



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


