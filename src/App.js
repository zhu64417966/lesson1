import React from 'react';
import Pager from './Pager';

export default class App extends React.Component {
  state = {
    currentPage: 1,
    pageSize: 5,
    total: 100,
    panelNumber: 4
  }

  pageChange(currentPage) {
    this.setState({
      currentPage
    })
  }

  render() {
    return (
      <Pager {...this.state} pageChange={this.pageChange.bind(this)} />
    )
  }
}
