import React from 'react';

const TabFooter = (props) => {
  const {
    children,
    prefix
  } = props

  return (
    <div className={`${prefix}`}>
      {children}
    </div>
  )
}

TabFooter.defaultProps = {
  prefix: 'content-footer'
}

export default TabFooter