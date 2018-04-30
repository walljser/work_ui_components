import React from 'react';
import classNames from 'classnames';

const CardList = (props) => {
  const {
    className,
    children
  } = props

  const classes = classNames(
    'card-row',
    className
  )

  return (
    <div className={classes}>
      {children}
    </div>
  )
}

export default CardList