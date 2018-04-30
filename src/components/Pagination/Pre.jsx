import React from 'react';
import PropTypes from 'prop-types';
import PreSvg from '@/assets/svgs/pre.svg';

export default class Pre extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired
  }

  render() {
    const {
      onClick
    } = this.props

    return (
      <button className="btn-pre" onClick={onClick}>
        <i className="iconfont" dangerouslySetInnerHTML={{__html: PreSvg}}></i>
      </button>
    )
  }
}