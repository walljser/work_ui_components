import React from 'react';
import PropTypes from 'prop-types';
import NextSvg from '@/assets/svgs/next.svg';

export default class Next extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired
  }

  render() {
    const {
      onClick
    } = this.props

    return (
      <button className="btn-pre" onClick={onClick}>
        <i className="iconfont" dangerouslySetInnerHTML={{__html: NextSvg}}></i>
      </button>
    )
  }
}