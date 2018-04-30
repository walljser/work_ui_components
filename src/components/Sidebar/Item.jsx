import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import bookSvg from './assets/svgs/book.svg';
import bookHoverSvg from './assets/svgs/book_hover.svg';
import bookActiveSvg from './assets/svgs/book_active.svg';

const Item = (props) => {
  const {
    children,
    active,
    to
  } = props

  const classes = classNames(
    'sidebar-nav-item',
    {
      'active': active
    }
  )

  return (
    <li className={classes}>
      <Link to={to}>
        <span className="sidebar-nav-svg sidebar-nav-svg-normal" dangerouslySetInnerHTML={{__html: bookSvg}} />
        <span className="sidebar-nav-svg sidebar-nav-svg-hover" dangerouslySetInnerHTML={{__html: bookHoverSvg}} />
        <span className="sidebar-nav-svg sidebar-nav-svg-active" dangerouslySetInnerHTML={{__html: bookActiveSvg}} />
        {children}
      </Link>
    </li>
  )
}

Item.propTypes = {
  active: PropTypes.bool,
  to: PropTypes.string
}

export default Item