import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Tab = (props) => {
  const {
    name,
    active,
    ...others
  } = props

  const classes = classNames(
    'content-header-tab-item',
    {
      'active': active
    }
  )

  return (
    <li className={classes} {...others}>
      {name}
    </li>
  )
}

Tab.propTypes = {
  name: PropTypes.string.isRequired
}

export default Tab;