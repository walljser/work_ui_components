import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import infoSvg from '@/assets/svgs/info.svg';
import successSvg from '@/assets/svgs/success.svg';

/**
 * 依赖Notication，是Notication的子组件
 * Toast的依赖组件，核心功能：初始化时，生成一个定时器
 * Notice的显示和隐藏，受到Notifaction的控制
 * @export
 * @class Notice
 * @extends {React.Component}
 */
export default class Notice extends React.Component {
  static propTypes = {
    duration: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    prefix: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }

  static defaultProps = {
    duration: 2000,
    prefix: 'notice'
  }

  constructor(props) {
    super(props)

    this.state = {
      closing: false // 正在关闭，帮助显示关闭过度动画
    }
  }

  componentDidMount() {
    this.startTimer()
  }

  componentWillUnmount() {
    this.clearTimmer()
  }

  /**
   * 生成一个定时器,结束后关闭Notice
   * 
   * @memberof Notice
   */
  startTimer = () => {
    if (this.props.duration) {
      this.timmer = setTimeout(() => {
        this.close()
      }, this.props.duration)
    }
  }

  /**
   * 清除定时器
   * 
   * @memberof Notice
   */
  clearTimmer = () => {
    if (this.timmer) {
      clearTimeout(this.timmer)
      this.timmer = null
    }
  }

  /**
   * 逻辑
   * 先清除定时器，然后设置closing，设置一个过度动画定时器，开启过度动画
   * 然后调用props.onClose关闭notice，再清除过度动画定时器
   */
  close = () => {
    this.clearTimmer()

    this.setState({
      closing: true
    })

    this.closeTimmer = setTimeout(() => {
      if (this.props.onClose) {
        this.props.onClose()
      }

      clearTimeout(this.closeTimmer)
    }, 1000)
  }

  renderIcon() {
    const type = this.props.type || ''

    if (type === 'info') {
      return (
        <span className="notice-icon" dangerouslySetInnerHTML={{__html: infoSvg}}/>
      )
    } else if (type === 'success') {
      return (
        <span className="notice-icon" dangerouslySetInnerHTML={{__html: successSvg}}/>
      )
    } else {
      return null
    }
  }

  render() {
    const {
      prefix,
      type,
      content
    } = this.props
    const { closing } = this.state

    const classes = classNames(
      [
        prefix,
        {
          [`${prefix}-info`]: type === 'info',
          [`${prefix}-success`]: type === 'success',
          [`${prefix}-closing`]: closing
        }
      ]
    )
    const icon = this.renderIcon()

    return (
      <div className={classes}>
        {icon}
        <div className={`${prefix}-content`}>
          {content}
        </div>
      </div>
    )
  }
}