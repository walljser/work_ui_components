import React, { Component } from 'react';
import searchSVG from '@/assets/svgs/search.svg';
import Button from './Button';

export default class SearchBar extends Component {
  state = {
    value: ''
  }

  handleChange = (e) => {
    const value = e.target.value

    this.setState({
      value
    })
  }

  render() {
    const value = this.state.value

    return (
      <div className="content-searchbar">
        <div className="content-searchbar-group">
          <div className="content-searchbar-input">
            <input type="text" value={value} onChange={this.handleChange} placeholder="搜索资源..." />
            <i className="content-searchbar-input-icon" dangerouslySetInnerHTML={{__html: searchSVG}} />
          </div>
          <Button type="primary" className="content-searchbar-btn">
            搜索
          </Button>
        </div>
      </div>
    )
  }
}