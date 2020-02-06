import React, { Component } from 'react';
import barChartD3 from './barChartD3'

class ChartPlaceholder extends Component {

  componentDidMount() {
    console.log('mounting')
    this._chart = barChartD3.create(
      this.refs.bar_chart,
      this.props.data,
      this.props.configs
    )
  }

  render() {
    return (
      <div className='bar_chart' ref='bar_chart' />
      // <div className='bar-chart' ref={this._setRef.bind(this)} />
        
      // </div>
    );
  }
}

export default ChartPlaceholder;