import React, { Component } from 'react';
import barChartD3 from './barChartD3'

class BarChart extends Component {

  componentDidMount() {
    console.log('mounting CHART')
    this._chart = barChartD3.create(
      this.refs.bar_chart,
      this.props.data,
      this.props.configs
    )
    barChartD3.update(
      this.refs.bar_chart,
      this.props.data,
      this.props.configs
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const { promptIdx, data } = prevProps
    console.log('prev Idx', promptIdx)
    if (promptIdx !== this.props.promptIdx) {
      console.log('REMOVING OLD CHART')
      barChartD3.newChart(this.refs.bar_chart, this.props.data, this.props.configs)
      
      console.log('updating for NEW CHART')
      this._chart = barChartD3.update(
        this.refs.bar_chart,
        this.props.data,
        this.props.configs
    )
    }
    const newData = this.props.data
    const dataUpdate = newData.filter((elem, i) => {
      return elem.y === data[i].y
    }).length === newData.length
    
    if (dataUpdate) {
      console.log('updating CHART', this.props.data)
      barChartD3.update(
        this.refs.bar_chart,
        this.props.data,
        this.props.configs
      )
    }
  }

  // componentWillUnmount() {
  //   barChartD3.destroy(this.bar_chart)
  // }

  // _setRef = (componentNode) => {
  //   this._rootNode = componentNode;
  // }
  render() {
    return (
      <div className='bar_chart' ref='bar_chart' />
      // <div className='bar-chart' ref={this._setRef.bind(this)} />
        
      // </div>
    );
  }
}

export default BarChart;