import React from 'react';
import './pager.css';

export default class Pager extends React.Component {
  constructor(props) {
    super(props);
    let total = props.total || 0, pageSize = props.pageSize || 10;
    this.state = {
      currentPage: props.currentPage || 1,
      pageSize,
      total,
      pageNum: Math.ceil(total / pageSize),
      panelNumber: props.panelNumber || 5
    }
  }

  toPage(page) {
    console.log('toPage', page)
    if (page === this.state.currentPage) {
      return;
    }
    this.props.pageChange && this.props.pageChange(page);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.currentPage !== state.currentPage) {
      return {
        currentPage: props.currentPage
      }
    }
    return null;
  }
  getPages() {
    let { pageNum, currentPage, panelNumber } = this.state, minNum = 0, maxNum = 0, pageList = [];
    // debugger;
    if (currentPage <= Math.round(panelNumber / 2)) {
      minNum = 1;
      maxNum = Math.min(minNum + panelNumber - 1, pageNum);
    } else if (currentPage > (pageNum - Math.round(panelNumber / 2))) {
      maxNum = pageNum;
      minNum = Math.max(maxNum - panelNumber + 1, 1);
    } else {
      minNum = currentPage - Math.ceil(panelNumber / 2) + 1;
      maxNum = currentPage + Math.floor(panelNumber / 2);
    }
    for (let i = minNum; i <= maxNum; i++) {
      pageList.push(i);
    }
    return pageList
  }
  render() {
    const { currentPage, pageNum } = this.state, pageList = this.getPages() || [];
    return <div className="pager">
      <a className={`${currentPage !== 1 ? '' : 'disabled'}`} onClick={this.toPage.bind(this, 1)}>首页</a>
      <a className={`${currentPage === 1 ? 'disabled' : ''}`} onClick={this.toPage.bind(this, currentPage - 1)}>上一页</a>
      {
        pageList.map(page => <a key={page} className={`${page === currentPage ? 'on' : ''}`} onClick={this.toPage.bind(this, page)}>{page}</a>)
      }
      <a onClick={this.toPage.bind(this, currentPage + 1)} className={`${currentPage === pageNum ? 'disabled' : ''}`}>下一页</a>
      <a onClick={this.toPage.bind(this, pageNum)} className={`${currentPage === pageNum ? 'disabled' : ''}`}>尾页</a>
    </div>
  }
}