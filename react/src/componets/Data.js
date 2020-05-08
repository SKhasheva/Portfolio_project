// data
import React, { Component}  from 'react';

class Data extends Component{
    constructor() {
        super();
        this.state = {
            data: []
        };
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
            data: json
          })
        })
        .catch((error) => console.log(error));
      }

      render() {
          console.log(this.state.data)
          return this.state.data
      }
}

export default Data;
