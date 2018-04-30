import React from 'react';
import PropTypes from 'prop-types';
import searchSvg from './assets/svgs/search.svg';

export default class Selector extends React.Component {
  static propTypes = {
    authors: PropTypes.array.isRequired,
    selected: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      selected: this.props.selected ? this.props.selected : [], // 已选中内容
      filter: '' // 过滤器字符串
    }
  } 

  /**
   * 从父组件中获取选中内容，并更新
   * 
   * @param {any} nextProps 
   * @param {any} nextState 
   * @memberof Selector
   */
  componentWillReceiveProps(nextProps, nextState) {
    if (this.props.selected !== nextProps.selected) {
      this.setState({
        selected: nextProps.selected
      })
    }
  }

  /**
   * 点击option，改变选中状态
   */
  handleClick = (value) => {
    const { selected } = this.state

    const isContains = selected.includes(value)

    if (!isContains) {
      selected.push(value)
      this.setState({
        selected
      })
    } else {
      const index = selected.indexOf(value)
      selected.splice(index, 1)
      this.setState({
        selected
      })
    }

    this.props.onChange(selected)
  }

  /**
   * 过滤器内容改变
   * 
   * @memberof Selector
   */
  handleFilterChange = (e) => {
    const value = e.target.value
    this.setState({
      filter: value
    })
  }

  /**
   * options double click event
   */
  handleDbClick = (value) => {
    const selected = this.state.selected

    if (selected.includes(value)) {
      const index = selected.indexOf(value)
      selected.splice(index, 1)

      this.setState({
        selected
      })
    }

    this.props.onValueChange(value, selected, 'add')
  }

  render() {
    const {
      authors
    } = this.props

    const selected = this.state.selected

    return (
      <div className="modal-dialog-selector-wrapper">
        <div className="modal-dialog-filter">
          <input
            type="text"
            className="modal-dialog-filter-input"
            placeholder="搜索人名..."
            value={this.state.filter}
            onChange={this.handleFilterChange}
          />
          <i className="icon-search" dangerouslySetInnerHTML={{__html: searchSvg}} />
        </div> 
        <select
          className="modal-dialog-selector"
          name=""
          multiple
          value={selected}
          onChange={(e) => e.preventDefault()}
        >
          {
            authors && authors.length > 0 ? (
              authors.map((author) => {
                if (isContains(author.name, this.state.filter)) {
                  return (
                    <option
                      className="modal-dialog-select-item"
                      key={author.id}
                      value={author.id}
                      onClick={(e) => {
                        e.preventDefault()
                        this.handleClick(author.id)
                      }}
                      onDoubleClick={(e) => {
                        e.preventDefault()
                        this.handleDbClick(author.id)
                      }}
                    >
                      {author.name}
                    </option>
                  )
                }
                return null
              })
            ) : null
          }
        </select>
      </div>
    )
  }
}

/**
 * str isContains subStr ? 
 * 
 * @param {any} str 
 * @param {any} subStr 
 * @returns true or false
 */
function isContains(str, subStr) {
  return str.indexOf(subStr) >= 0;
}