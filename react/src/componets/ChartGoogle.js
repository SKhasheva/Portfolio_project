import React, {Component} from 'react';
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
      ];
      for (let element of this.state.data) {
          dataChart.push([element["date"], element["invested"], element["portfolioCost"]])
        }

      return (
        <div>
          <div id='user'>      
            <p style={{display: this.state.data.length ? 'none' : 'block'}}>No data to show</p>
          </div>
          <div style = {{display: this.state.data.length ? 'block' : 'none' }}>
          <Chart
            height={'500px'}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data = {dataChart}
            options={{
              title: 'Cost of Portfolio vs Invested money',
              colors: ['#D700CD', '#1D19DB'],
              backgroundColor: '#ddd3e2',
                hAxis: {
                  title: 'Date',
                    },
                vAxis: {
                  title: 'Cost',
                    },
                }}
            rootProps={{ 'data-testid': '2' }}/>
          </div>

        </div>
        );
      };
  }
  
export default ChartGoogle;