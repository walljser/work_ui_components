import React from 'react';
import PropTypes from 'prop-types';
import uploadSvg from './assets/svgs/upload.svg';
import createSvg from './assets/svgs/create.svg';

export default class TabHeader extends React.Component {
  static propTypes = {
    leftBtn: PropTypes.string.isRequired,
    rightBtn: PropTypes.string.isRequired,
    handleLeftBtnEvent: PropTypes.func,
    handleRightBtnEvent: PropTypes.func,
  }

  /**
   * left button
   * 
   * @memberof TabHeader
   */
  handleLeftBtnEvent = (e) => {
    e.preventDefault() 

    if (this.props.handleLeftBtnEvent && typeof this.props.handleLeftBtnEvent === 'function') {
      this.props.handleLeftBtnEvent()
    }
  }

  /**
   * right button
   * 
   * @memberof TabHeader
   */
  handleRightBtnEvent = (e) => {
    e.preventDefault() 

    if (this.props.handleRightBtnEvent && typeof this.props.handleRightBtnEvent === 'function') {
      this.props.handleRightBtnEvent()
    }
  }

  render() {
    const {
      children,
      leftBtn,
      rightBtn
    } = this.props
    
    return (
      <header className="content-header container">
        <ol className="content-header-tab">
          {children}
        </ol>
        <div className="content-header-btn">
          <button 
            className="btn btn-primary"
            onClick={this.handleLeftBtnEvent}
          >
            <i className="content-header-btn-icon" dangerouslySetInnerHTML={{__html: uploadSvg}} />
            {leftBtn}
          </button>
          <button 
            className="btn btn-primary"
            onClick={this.handleRightBtnEvent}
          >
            <i className="content-header-btn-icon" dangerouslySetInnerHTML={{__html: createSvg}} />
            {rightBtn}
          </button>
        </div>
      </header>
    )
  }
}