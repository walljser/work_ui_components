import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Notice from './Notice';
import * as Utils from '../utils/index';

let noticeNumber = 0

/**
 * notice的父组件，用来动态控制notice的渲染和移除
 */
export default class Notification extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      notices: [], // 存储notice数组
    }
  }

  static specialInstance(properties) {
    const { getContainer, ...props } = properties || {}
    const _div = document.createElement('div')
    let container

    if (getContainer) {
      container = getContainer()
      container.appendChild(_div)
    } else {
      container = document.body
      container.append(_div)
    }

    // 在DOM中插入Notification， 得到ReactElement
    const notification = ReactDOM.render(<Notification {...props}/>, _div)

    return {
      notice(noticeProps) {
        notification.add(noticeProps)
      },
      removeNotice(key) {
        notification.remove(key)
      },
      destroy() {
        ReactDOM.unmountComponentAtNode(_div)
        container.removeChild(_div)
      },
      component: notification
    }
  }

  /**
   * 添加notice
   */
  add(notice) {
    const { notices } = this.state
    const key = notice.key ? notice.key : notice.key = Utils.getUuid(noticeNumber++)
    const temp = notices.filter((v) => v.key === key)

    // 不存在重复的key
    if (temp.length === 0) {
      notices.push(notice)
      this.setState({
        notices
      })
    }
  }

  /**
   * 根据key删除notice
   * 
   * @param {any} key 
   * @memberof Notification
   */
  remove(key) {
    this.setState(preState => {
      return {
        notices: preState.notices.filter((v) => v.key !== key)
      }
    })
  }

  getNoticesDOM = () => {
    const { notices } = this.state
    let result = []

    notices.map((notice) => {
      const closeCallback = () => {
        this.remove(notice.key)
        if (notice.onClose) {
          notice.onClose()
        }
      }

      result.push(
        <Notice
          key={notice.key}
          {...notice}
          onClose={closeCallback}
        />
      )

      return null
    })

    return result
  }

  render() {
    const { notices } = this.state
    const noticesDOM = this.getNoticesDOM()
    const classes = classNames({
      'notification-box': notices.length !== 0
    })

    return (
      <div className="notification">
        <div className={classes}>
          {noticesDOM}
        </div> 
      </div>
    )
  }
}