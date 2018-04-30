import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './assets/styles.scss';

const Spin = (props) => {
  const {
    type,
    className,
    prefixCls,
    ...otherProps
  } = props

  const classes = classNames(
    className,
    `${prefixCls}`,
    {
      [`${prefixCls}-absolute`]: type === 'absolute',
      [`${prefixCls}-fixed`]: type === 'fixed'
    }
  )

  return (
    <div className={classes} {...otherProps}>
      <div className="spin-inner">
      </div>
    </div>
  )
}

Spin.propTypes = {
  type: PropTypes.string
}

Spin.defaultProps = {
  prefixCls: 'spin'
}

export default Spin