import React, {Component} from 'react';
//import Media from 'react-media';
import Chart from "react-google-charts";

class ChartGoogle extends Component {
  constructor() {
    super();
    this.state = {
      data : []
    };
  }

  componentDidMount() {
    
    const url = 'http://127.0.0.1:5000/chart/';
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

      let dataChart= [
        [
          'Date',
          'Invested',
          'Portfolio',
        ]
      ]
      ;

      for (let element of this.state.data) {
        dataChart.push([element["date"], element["invested"], element["portfolioCost"]])
      }


      return (

        <div>
            
        <Chart
        
        height={'500px'}
        chartType="Line"
        loader={<div>Loading Chart</div>}

        data = {dataChart}

        options={{
          chart: {
            title: 'Box Office Earnings in First Two Weeks of Opening',
            subtitle: 'in millions of dollars (USD)',
          },
        }}
        rootProps={{ 'data-testid': '3' }}
      />
      </div>
    );
  };
}
  
export default ChartGoogle;