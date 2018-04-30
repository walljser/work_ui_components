import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';
import TabHeader from './TabHeader';
import TabPanel from './TabPanel';
import TabFooter from './TabFooter';
import './assets/styles.scss';

export default class Tabs extends Component {
  static propTypes = {
    defaultActive: PropTypes.string.isRequired,
    leftBtn: PropTypes.string.isRequired,
    rightBtn: PropTypes.string.isRequired,
    handleLeftBtnEvent: PropTypes.func,
    handleRightBtnEvent: PropTypes.func
  }

  static Header = TabHeader
  static Item = TabPanel
  static Footer = TabFooter

  constructor(props) {
    super(props)

    this.state = {
      active: this.props.defaultActive // 是否选中状态（激活状态）
    }
  }

  /**
   * tab选中状态改变
   * 
   * @memberof Tabs
   */
  handleTabChange = (active) => {
    this.setState({
      active
    })
  }

  renderHeaderTab = (arr) => {
    const tabs = arr ? arr : []
    const length = tabs.length
    const node = []

    tabs.map((item, index) => {
      const active = item.key === this.state.active ? true : false

      if (index === (length - 1)) {
        node.push(
          <Tab name={item.name} key={item.key} active={active} onClick={() => this.handleTabChange(item.key)}/>
        )
      } else {
        node.push(
          <Tab name={item.name} key={item.key} active={active} onClick={() => this.handleTabChange(item.key)}/>
        )
        node.push(
          <li className="content-header-tab-divider" key={index + 100}></li>
        )
      }

      return item
    })

    return node
  }

  render() {
    const {
      leftBtn,
      rightBtn
    } = this.props

    const tabs = []
    
    // 判断children的类型，选择指定的地方放children,主要为了tab头部的位置
    const children = React.Children.map(this.props.children, (child, index) => {
      if (child.type === TabPanel) {
        const {
          tab,
          id
        } = child.props

        tabs.push({
          name: tab,
          key: id
        })
      }

      const active = this.state.active === child.props.id ? true : false

      return React.cloneElement(child, {
        active
      })
    })

    const tabsNode = this.renderHeaderTab(tabs)

    return (
      <section id="main" className="content">
        <TabHeader
          leftBtn={leftBtn}
          rightBtn={rightBtn}
          handleLeftBtnEvent={this.props.handleLeftBtnEvent}
          handleRightBtnEvent={this.props.handleRightBtnEvent}
        >
          {tabsNode}
        </TabHeader>
        <div className="content-body container">
          {children}
        </div>
      </section>
    )
  }
}