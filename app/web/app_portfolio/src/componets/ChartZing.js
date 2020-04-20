import React, {Component} from 'react';
//import Media from 'react-media';
import ZingChart from 'zingchart-react';

class Chart extends Component {
    constructor(props) {
      super(props);
      this.state = {
        config: {
          type: 'line',
          series: [
            { values: [20,40,25,50,15,45,33,34]},
            { values: [5,30,21,18,59,50,28,33]},
            { values: [30,5,18,21,33,41,29,15]}
          ]
        }
      }
    }
    render() {
      return (
        <div className='Chart'>
          <ZingChart data={this.state.config}/>
        </div>
      );
    }
  }

export default Chart;