import React, { Component}  from 'react';
//import OneRow from './OneRow';
//import myShares from './myShares';

class DetailedPortfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myShares : [],
            mySharesValues: [],
            newShares: [],
            sharesValues: [],
            addList: []
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
          console.log(json)
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
          console.log(json)
          this.setState({
            newShares: json
          })
        })
        .catch((error) => console.log(error));

      }  

      

      handleChange(i, event) {
        let values = [...this.state.mySharesValues];
        values[i] = event.target.value;
        this.setState({
            myShares: this.state.myShares, 
            mySharesValues: values,
            newShares: this.state.newShares,
            sharesValues: this.state.sharesValues

         });
      } 
      
      

/*
     handleChange(i, event) {
        let values = [...this.state.values];
        values[i] = event.target.value;
        
         const val = [...this.target.values];
         val[i] = event.target.value;
         this.setState({
             [name]: val
         });
      } 
      */


// table with Portfolio

      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.mySharesValues.join(', '));
        event.preventDefault();
      }

      createUI(){
            const classState = this
          return this.state.myShares.map((row, i) =>
            <div key={i}>
                <tr>
                <td>{row.ticker}</td>
                <td>{row.cost}</td>
                <td>{row.cnt}</td>
                <td>{row.price}</td>
                <td>{row.curcost}</td>
                <td><input name='values' type="number" value={classState.state.mySharesValues[i]||''} onChange={classState.handleChange.bind(this, i)}/></td>
                </tr>   
            </div>
          )
      }

// add new elements



selectOptions() {

    const classState = this;
    let shares = classState.state.newShares;
    let optionItems = shares.map((el) =>
        <option key={el.ticker}>{el.ticker} - {el.price}</option>
    );
    console.log(optionItems);
    return optionItems;
}






createUIForNew(){
    const classState = this
    return classState.state.sharesValues.map((el, i) => 
        <div key={i}>
           <select value={classState.state.addList[i]} >
           {classState.selectOptions()}
            </select> 
            <input type="number" value={classState.state.sharesValues[i]||''} onChange={classState.handleNew.bind(this, i)}/>
           <input type='button' value='remove' onClick={classState.removeClick.bind(this, i)}/>
        </div>          
    )
 }

 handleNew(i, event) {
    let sharesValues = [...this.state.sharesValues];
    sharesValues[i] = event.target.value;
    this.setState({  myShares: this.state.myShares, 
        mySharesValues : this.state.myShares,
        newShares: this.state.newShares,
        sharesValues });
 }
 
 addClick(){
   this.setState(prevState => ({
    myShares: this.state.myShares, 
    mySharesValues : this.state.myShares,
    newShares: this.state.newShares,
    sharesValues: [...prevState.sharesValues, '']}))
 }
 
 
 removeClick(i){
    let sharesValues = [...this.state.sharesValues];
    sharesValues.splice(i,1);
    this.setState({ myShares: this.state.myShares, 
        mySharesValues : this.state.myShares,
        newShares: this.state.newShares,
        sharesValues });
 }
 
     






      calculateInvested(){
          let money=0.0;
          for (let i=0; i<this.state.mySharesValues.length; i++) {
              if (!Number.isNaN(parseFloat(this.state.mySharesValues[i]))) {
                money += parseFloat(this.state.myShares[i].price)*parseFloat(this.state.mySharesValues[i])
              }
            
            //*this.state.values[i]
          }
          
            return money;
      }


      render() {
     
      

      return (
        <div>
            <br />
            <div></div>
            {this.createUI()}
            <div>{this.calculateInvested()}</div>
            
            {this.createUIForNew()}
            <input type='button' value='add new shares' onClick={this.addClick.bind(this)}/>
        </div>
    )

    }
}

   


export default DetailedPortfolio

