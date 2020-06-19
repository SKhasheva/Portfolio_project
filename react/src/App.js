
import React, { useState, useEffect }  from 'react';
import './css/App.css';
import ChartGoogle from './componets/ChartGoogle';
import ExchangeRate from './componets/ExchangeRate';
import DetailedPortfolio from './componets/DetailedPortfolio';



function App() {

  //Initial states
  const[isHome, setHome] = useState(<ExchangeRate />);
  const [isChartGoogle, setChartGoogle] = useState(<div></div>);
  const [isDetails, setDetails] = useState(<div></div>);
  const [userName, setUserName] = useState('');
  const [urlHref] = useState(window.location.href);


  // Home screen
  function showHome() {
    setHome(<ExchangeRate />);
    setChartGoogle(<div></div>);
    setDetails(<div></div>)
  } 
  
  //Chart screen
  function showChartGoogle() {
    setChartGoogle(<ChartGoogle />);
    setHome(<div></div>);
    setDetails(<div></div>)
  }

  //Detailed Portfolio screen
  function showDetails() {
    setChartGoogle(<div></div>);
    setHome(<div></div>);
    setDetails(<DetailedPortfolio />)
  }

  //logout
  function handleLogout() {
    //const url_logout = 'http://127.0.0.1:5000/logout/';
    const url_logout = urlHref.replace(window.location.pathname, '/logout/')
    fetch(url_logout)
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
    //const url_username = 'http://127.0.0.1:5000/username/';
    const url_username = urlHref.replace(window.location.pathname, '/username/');
    fetch(url_username)
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
          {userName}     
          <a id="logout" href={urlHref.replace(window.location.pathname, '')} onClick={handleLogout}> LogOut</a> 
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
                  {/*   <a href="#">Contact</a> */}
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
