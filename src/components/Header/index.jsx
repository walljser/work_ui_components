import React from 'react';
import headerLogo from './assets/svgs/header_logo.svg';
import userSvg from './assets/svgs/user.svg';
import studentsSvg from './assets/svgs/students.svg';
import devicesSvg from './assets/svgs/devices.svg';
import './assets/styles.scss';

export default class Header extends React.Component {
  render() {
    return (
      <header className="header-navbar">
        <div className="header-navbar-logo">
          <span dangerouslySetInnerHTML={{__html: headerLogo }} />
          <div className="header-navbar-logo-content">VR创客教室</div>
        </div>
        <div className="header-navbar-brand container">
          <ul className="header-navbar-group">
            <li className="header-navbar-item">
              <div className="user">
                <span dangerouslySetInnerHTML={{__html: userSvg}} />
                用户 : 王小明
              </div>
            </li>
            <li className="header-navbar-item-divider"></li>
            <li className="header-navbar-item">
              <div className="identity">
                <span dangerouslySetInnerHTML={{__html: studentsSvg}} />
                身份 : 学生
              </div>
            </li>
            <button className="btn btn-primary btn-outline header-navbar-item-right">
              设备选择
              <span dangerouslySetInnerHTML={{__html: devicesSvg}} />
            </button>
          </ul>
        </div>
      </header>
    )
  }
}