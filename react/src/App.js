
import React, { useState, useEffect }  from 'react';
import './css/App.css';
import ChartGoogle from './componets/ChartGoogle';
import Currency from './componets/Currency';
import DetailedPortfolio from './componets/DetailedPortfolio';
//import Data from './componets/Data';



function App() {


  const[isHome, setHome] = useState(<div></div>);
  const [isChartGoogle, setChartGoogle] = useState(<div></div>);
  const [isDetails, setDetails] = useState(<div></div>);
  const [userName, setUserName] = useState('');


  function showHome() {
    setHome(<div>
                <Currency currency='EUR'/>
                <Currency currency='USD'/>
            </div>);
    setChartGoogle(<div></div>);
    setDetails(<div></div>)
  } 
  

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

  //logout
  function handleLogout() {
    const url = 'http://127.0.0.1:5000/logout/';
    fetch(url)
    .then(
      (response) => {
        return response.json();
      })
    .then(json => {
      return json
    })
    .catch((error) => console.log(error));
  }

  //get user name
  useEffect(() =>{
    const url = 'http://127.0.0.1:5000/username/';
    fetch(url)
    .then(
      (response) => {
        return response.text();
      })
    .then(json => {
      setUserName(json);
    })
    .catch((error) => console.log(error));
  })

  return (
    <div>
     <header id="grid">

          <div id="user" >
          You are loged as {userName}
           <a id="logout" href="http://127.0.0.1:5000/" onClick={handleLogout}> LogOut</a>
          </div>

          

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
