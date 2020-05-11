import React, { Component}  from 'react';
//import OneRow from './OneRow';
//import myShares from './myShares';

class DetailedPortfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myShares : [],
            mySharesValues: [],
            listSharesMOEX: [],
            newShares: [],
            newSharesValues: [],
            addList: [],
            showTableHeader: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

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

      
/*
      handleChange2(i, event) {
        let values = [...this.state.newSharesValues];
        values[i] = event.target.value;
        this.setState({
          
            newSharesValues: values

         });
      } 
*/
    

      handleChange(i, event) {
        let values = (event.target.name === 'mySharesValues'? [...this.state.mySharesValues]: [...this.state.newSharesValues]) 

          values[i] = event.target.value;
          let name = event.target.name;
          this.setState({
              [name]: values
          })
         console.log(this.state.mySharesValues);
         console.log(this.state.newSharesValues);

      }
      


// table with Portfolio

      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.mySharesValues.join(', '));
        event.preventDefault();
      }

      createUI(){
            const classState = this
          return this.state.myShares.map((row, i) =>
            <tr key={i}>
                <td>{row.ticker}</td>
                <td>{row.cost}</td>
                <td>{row.cnt}</td>
                <td>{row.price}</td>
                <td>{row.curcost}</td>
                <td><input name='mySharesValues' type="number" value={classState.state.mySharesValues[i]||''} onChange={classState.handleChange.bind(this, i)}/></td>
            </tr>   
           
          )
      }

// add new elements





selectOptions() {

    const classState = this;
    let shares = classState.state.listSharesMOEX;
    let optionItems = shares.map((el) =>
        <option key={el.ticker}>{el.ticker} - {el.price}</option>
    );
    console.log(optionItems);
    return optionItems;
}


createUIForNew(){
    const classState = this
    return classState.state.newSharesValues.map((el, i) => 
        <tr key={i}>
          <td> <select  onChange={classState.handleNew.bind(this, i)} >
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

 handleNew(i, event) {
    let shares = [...this.state.newShares];
    let val = event.target.value;
    shares[i] = {ticker: val.substring(0, 5), price: val.substring(7)};
    
    this.setState({  //myShares: this.state.myShares, 
        //mySharesValues : this.state.mySharesValues,
       // listSharesMOEX: this.state.listSharesMOEX,
     newShares: shares});
 }
 
 addClick(){
   this.setState(prevState => ({
    showTableHeader: true,
   // myShares: this.state.myShares, 
   // mySharesValues : this.state.mySharesValues,
   // listSharesMOEX: this.state.listSharesMOEX,
    newSharesValues: [...prevState.newSharesValues, '']}))
 }
 
 
 removeClick(i){
    let newSharesValues = [...this.state.newSharesValues];
    newSharesValues.splice(i,1);
    this.setState({
        //myShares: this.state.myShares, 
        //mySharesValues : this.state.mySharesValues,
        //listSharesMOEX: this.state.listSharesMOEX,
        newSharesValues });
 }
 
     

      calculateInvested(){
        // calculated the total money that would be invested
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


      render() {
     
      return (
        <div>
            <br />
            <div></div>
            <table>
                <tr>
                    <th>Ticker</th>
                    <th>Previous Cost</th>
                    <th>Count</th>
                    <th>Current Price (per 1)</th>
                    <th>Current Cost</th>
                    <th>Buy/Sell Amount</th>
                </tr>               
                {this.createUI()}
            </table>
           <br />
           <table id='newShares' style={{display: this.state.showTableHeader ? 'block' : 'none' }}>
               <tr>
                   <th>Ticker with price</th>
                   <th>Buy Amount</th>
                   <th></th>
               </tr>
           

            {this.createUIForNew()}
            </table>
            <input type='button' value='add new shares' onClick={this.addClick.bind(this)}/>
            <br />
            <hr />
            <p>Total amount to invest:</p>
            <div>{this.calculateInvested()}</div>
        </div>
    )

    }
}

   


export default DetailedPortfolio

