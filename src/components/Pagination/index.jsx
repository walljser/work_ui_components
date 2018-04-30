import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Next from './Next';
import Pre from './Pre';
import Item from './Item';
import "./assets/styles.scss";

export default class extends React.Component {
  static defaultProps = {
    prefix: 'pagination'
  }

  static propTypes = {
    current: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    handleChange: PropTypes.func
  }

  constructor(props) {
    super(props)

    this.state = {
      current: this.props.current || 1 // 当前页码
    }
  }

  /**
   * handle current page change
   */
  handleChange = (page) => {
    page = page < 1 ? 1 : page
    page = page > this.props.total ? this.props.total : page

    const { current } = this.state
    if (this.props.handleChange) {
      if (current !== page) {
        this.props.handleChange(page)
      }
    }

    this.setState({
      current: page
    })
    
  }

  /**
   * render pagination items
   */
  renderItem() {
    const {
      total
    } = this.props
    const current = this.state.current
    let items = [], numbers = []

    // const numbers = Array.from(new Array(total + 1).keys())
    // babel不能转译API，改用循环初始化数组
    for (let i = 1; i <= total; i++) {
      numbers.push(i)
    }

    if (current <= 3) { // 1 2 3 4 5 ... 100
      // 初始化显示分页数组
      const group = numbers.slice(0, 5)
      // 1 2 3 4 5
      items = group.map((num) => {
        const active = current === num ? true : false
        return (
          <Item active={active} key={num} onClick={() => this.handleChange(num)}>
            {num}
          </Item>
        )  
      })
      // ...
      items.push(<li key={6}>...</li>)
      // lastest
      items.push(
        <Item key={total} onClick={() => this.handleChange(total)}>
          {total}
        </Item>
      )
    } else if (current > (total - 3)) { // 1 ... total - 4 total -3 total -2 total -1 total
      // 1
      items.push(
        <Item key={1} onClick={() => this.handleChange(1)}>1</Item>
      )
      // ... 
      items.push(<li key={2}>...</li>)
      // 初始化显示分页数组
      const group = numbers.slice(total - 4, total + 1)
      group.map((num) => {
        const active = current === num ? true : false
        items.push(
          <Item
            active={active}
            key={num}
            onClick={() => this.handleChange(num)}
          >
            {num}
          </Item>
        )

        return null
      })
    } else {// 1 ... 3 4 5 6 7 ... 100
      const group = numbers.slice(current - 2, current + 2)
      // 1
      items.push(
        <Item key={1} onClick={() => this.handleChange(1)}>
          1
        </Item>
      )
      // ...
      items.push(<li key={0}>...</li>)
      // center blocks
      group.map((num, index) => {
        const active = current === num ? true : false
        items.push(
          <Item active={active} key={num} onClick={() => this.handleChange(num)}>
            {num}
          </Item>
        )  
        return null
      })
      // ...
      items.push(<li key={total + 1}>...</li>)
      // lastest
      items.push(
        <Item key={total} onClick={() => this.handleChange(total)}>
          {total}
        </Item>
      )
    }

    return items
  }

  render() {
    const {
      className,
      prefix
    } = this.props

    const { current } = this.state

    const classes = classNames(
      `${prefix}`,
      className
    )

    const items = this.renderItem()

    return (
      <footer className={classes}>
        <Pre
          onClick={() => this.handleChange(current - 1)}
        />
        <ul className="pagination content-footer-pagination">
          {items}
        </ul>
        <Next
          onClick={() => this.handleChange(current + 1)}
        />
      </footer>
    )
  }
}