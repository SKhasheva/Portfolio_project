import React, { Component}  from 'react';

class DetailedPortfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myShares : [],      // list of shares included to portfolio
            mySharesValues: [], // list of new count of shares from portfolio in case user wants to buy/sell
            listSharesMOEX: [], // listing of shares + current prices takesn from MOEX exchange
            newShares: [],      // list of new shares in case user wants to add new shares from MOEX exchange list 
            newSharesValues: [],// count of new shares 
            showTableHeader: false,
            investedMoney: 0,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

      // receive current portfolio for the user from the backend
        const url = 'http://127.0.0.1:5000/portfolio_details';

        fetch(url)
        .then(
          (response) => {
            return response.json();
          })
        .then(json => {
          this.setState({
            myShares: json
          })
        })
        .catch((error) => console.log(error));

        // recieve list of MOEX exchange shares with prices
        const urlShares = 'http://127.0.0.1:5000/shareslist';

        fetch(urlShares)
        .then(
          (response) => {
            return response.json();
          })
        .then(json => {
          json.unshift({"name":"","price":"","ticker":"Choose from the list"})
          this.setState({
            listSharesMOEX: json
          })
        })
        .catch((error) => console.log(error));

      }  

      // creates table with current portfolio of the user
      createUI(){
        const classState = this
      return this.state.myShares.map((row, i) =>
        <tr key={i}>
            <td>{row.ticker}</td>
            <td>{row.cnt}</td>
            <td>{row.price}</td>
            <td>{row.curcost.toFixed(2)}</td>
            <td><input name='mySharesValues' type="number" value={classState.state.mySharesValues[i]||''} onChange={classState.handleChange.bind(this, i)}/></td>
        </tr> 
      )
    }

      //creates table for the newly added shares
      createUIForNew(){
        const classState = this
        return classState.state.newSharesValues.map((el, i) => 
            <tr key={i}>
              <td> 
                <select  onChange={classState.handleNew.bind(this, i)}>
                {classState.selectOptions()}
                </select> 
              </td>
              <td>
                <input type="number" name='newSharesValues' min='0' value={classState.state.newSharesValues[i]||''} onChange={classState.handleChange.bind(this, i)}/>
              </td>
              <td>
                <input type='button' value='remove' onClick={classState.removeClick.bind(this, i)}/>
              </td>
            </tr>          
        )
      }

      // process event of changing count of existing shares {mySharesValues} or newly added {newSharesValues}
      // creates array with new count
      handleChange(i, event) {
        let values = (event.target.name === 'mySharesValues'? [...this.state.mySharesValues]: [...this.state.newSharesValues]) 
        values[i] = event.target.value;
        let name = event.target.name;
        this.setState({
          [name]: values
        })
      }


      // forming a list for select option from list of MOEX shares
      // the list shows Ticker + price 
      selectOptions() {
        const classState = this;
        let shares = classState.state.listSharesMOEX;
        let optionItems = shares.map((el) =>
            <option key={el.ticker}>{el.ticker} - {el.price}</option>
        );
        return optionItems;
      }


      // forms array of newly added shares
      handleNew(i, event) {
        let shares = [...this.state.newShares];
        let val = event.target.value;
        shares[i] = {ticker: val.substring(0, 5), price: val.substring(7)};
        this.setState({
          newShares: shares
        });
      }


      // add row event: adding additional row for the new shares table
      addClick(){
        this.setState(prevState => ({
         showTableHeader: true,
         newSharesValues: [...prevState.newSharesValues, '']
          })
        )
      }
      
      // remove row event: removing row from the new shares table
      removeClick(i){
         let newSharesValues = [...this.state.newSharesValues];
         newSharesValues.splice(i,1);
         this.setState({
           newSharesValues
          });
      }

      // calculates the total cost of the shares that user is going to buy/sel
      calculateInvested(){
        let money=0.0;
        // calculating cost of added/removed shares from portfolio
        for (let i=0; i<this.state.mySharesValues.length; i++) {
          if (!Number.isNaN(parseFloat(this.state.mySharesValues[i]))) {
            money += parseFloat(this.state.myShares[i].price)*parseFloat(this.state.mySharesValues[i])
          }   
        }
        // calculating cost of the new shares
        for (let i=0; i<this.state.newSharesValues.length; i++) {
          if (!Number.isNaN(parseFloat(this.state.newSharesValues[i]))) {
            money += parseFloat(this.state.newShares[i].price)*parseFloat(this.state.newSharesValues[i])
          }
        }
        money = money.toFixed(2);
        return money;
      }

     
      // submit (buy/add) button event
      handleSubmit(event) {
        let finalList=[];
        let cnt = 0;

        //Processing existing shares. If there is new count => sum previous and new shares
        //if no new count => leave the olf count
        
        for (let i=0; i<this.state.myShares.length; i++) {
          if (!Number.isNaN(parseFloat(this.state.mySharesValues[i]))) {
              cnt = parseInt(this.state.mySharesValues[i])
              finalList.push({
                    'ticker': this.state.myShares[i].ticker,
                    'price':  this.state.myShares[i].price,
                    'cnt': cnt
              }) 
          }; 
        }
           
        //Processing new shares list
        //If user didn't enter any count => we do not add this share to the list

        for (let i=0; i<this.state.newShares.length; i++) {
          if (!Number.isNaN(parseFloat(this.state.newSharesValues[i]))) {
              finalList.push({
                    'ticker': this.state.newShares[i].ticker,
                    'price':  this.state.newShares[i].price,
                    'cnt': parseInt(this.state.newSharesValues[i])
                    }) 
            } 
          };

          /// add invested
          //  let money = this.calculateInvested();
          //  finalList.push({
          //    'invested': money
          //  })

            
        // sending the formed list to the backend   
        fetch('http://127.0.0.1:5000/dataupdate/',
        {
          method: "POST",
          body: JSON.stringify(finalList),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          }).then(
            (response)=>{
              if (response.status === 200){
              alert("Message Sent."); 
              this.resetForm()
              } else if (response.status === 400){
                alert("Message failed to send.")
              }
          })
          event.preventDefault();
      }   
          
    render() {
     
      return (
        <div id='Details'>
            <br />
            <form onSubmit={this.handleSubmit}>
              <table style={{display: this.state.myShares.length ? 'block' : 'none' }}>
                <tr>
                    <th className="tooltip">Ticker
                      <span className="tooltiptext">Symbol of FTE used in Moscow Exchange</span>
                    </th>
                    <th className="tooltip">Count
                      <span className="tooltiptext">Number of shares in portfolio</span>
                    </th>
                    <th className="tooltip">Current Price (per 1)
                      <span className="tooltiptext">Current price of 1 share</span>
                    </th>
                    <th className="tooltip">Current Cost
                      <span className="tooltiptext">Current cost in Portfolio according to MOEX price</span>
                    </th>
                    <th className="tooltip">Buy/Sell Amount
                      <span className="tooltiptext">Incert positive number to buy or negative number to sell</span>
                    </th>
                </tr>               
                {this.createUI()}
              </table>
              <br />
              <table  id='newShares' style={{display: this.state.showTableHeader ? 'block' : 'none' }}>
               <tr>
                   <th className="tooltip">Ticker with price
                    <span className="tooltiptext">Choose FTE from the list. Format: Ticket - Price</span>
                   </th>
                   <th className="tooltip">Buy Amount
                    <span className="tooltiptext">Incert number of shares (only positive!) to buy</span>
                   </th>
                   <th></th>
               </tr>
              {this.createUIForNew()}
              </table>
              <input type='button'  value='add new shares' onClick={this.addClick.bind(this)}/>
              <br />
              <hr />
              <br />
              <p className="tooltip"> Total amount to invest:
                <span className="tooltiptext">Total sum to invest</span>
              </p>
              <div>{this.calculateInvested()}</div>
              <br />
              <hr />
              <input id='Buy' type="submit" value="Buy Shares" />
            </form>
        </div>
      )
    }
}


export default DetailedPortfolio

