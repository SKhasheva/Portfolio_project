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
        //chartType="Line"
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        

        data = {dataChart}
        /*
        options={{
          colors: ['#CDFB00', '#D700CD'],
          chart: {
            title: 'Cost of Portfolio vs Invested money',
            backgroundColor: '#D700CD',
            /* subtitle: 'in millions of dollars (USD)', 
         },
        }}

        */
       options={{
        title: 'Cost of Portfolio vs Invested money',
        
        //titleTextStyle: {
        //  color: '#a34f8b'
        //},
        
        colors: ['#D700CD', '#1D19DB'],
        backgroundColor: '#ddd3e2',
        hAxis: {
          title: 'Date',
        },
        vAxis: {
          title: 'Cost',
        },
      }}
        
        rootProps={{ 'data-testid': '2' }}
      />
      </div>
    );
  };
}
  
export default ChartGoogle;