import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import userSvg from './assets/svgs/user.svg';
import editSvg from './assets/svgs/edit.svg';
import playSvg from './assets/svgs/play.svg';
import deleteSvg from './assets/svgs/delete.svg';
import './assets/styles.scss';

export default class Card extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }

  renderAction = () => {
    return (
      <div className="card-action">
        <div className="card-action-btn">
          <i dangerouslySetInnerHTML={{__html: editSvg}}>
          </i>
          编辑
        </div>
        <div className="card-action-btn">
          <i dangerouslySetInnerHTML={{__html: playSvg}}>
          </i>
          播放 
        </div>
        <div className="card-action-btn">
          <i dangerouslySetInnerHTML={{__html: deleteSvg}}>
          </i>
          删除
        </div>
      </div>
    )
  }

  render() {
    const {
      className,
      data
    } = this.props

    const classes = classNames(
      'card-item',
      className
    )

    // 因为mock无法生成 "李明、要命、李章" 这样的格式，并与authors对应，这边就做一下处理
    let title = ''
    if (data.authors.length > 0) {
      title = data.authors.join('、')
    }

    const actions = this.renderAction()

    return (
      <div className={classes}>
        <header className="card-header" title={title}>
          <img className="card-header-image" src={data.image} alt="" />
          <p className="card-content">
            <i dangerouslySetInnerHTML={{__html: userSvg}}>
            </i>
            <span className="card-content-user">{data.authors.join('、')}</span>
            <span className="card-content-time">{data.createTime}</span>
          </p>
        </header>
        {
          actions
        }
        <footer className="card-footer">
          {data.name}
        </footer>
      </div>
    )
  }
}