import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import './assets/styles.scss';

export default class Sidebar extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  }

  static Item = Item

  render() {
    const {
      title,
      children,
      ...others
    } = this.props

    return (
      <aside className="sidebar" {...others}>
        <header className="sidebar-header">
          {title}
        </header>
        <nav className="sidebar-nav">
          <ul className="sidebar-nav-group">
            {children}
          </ul>
        </nav>
      </aside>  
    )
  }
}