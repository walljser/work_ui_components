import React from 'react';
import PropTypes from 'prop-types';

export default class extends React.Component {
  static propTypes = {
    value: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      selected: this.props.selected || [] // 已选中列表
    }
  }

  /**
   * 从父组件中获取已选中内容，并更新
   * 
   * @param {any} nextProps 
   * @param {any} nextState 
   */
  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.selected !== this.state.selected) {
      this.setState({
        selected: nextProps.selected
      })
    }
  }

  /**
   * 根据authorId获取author
   * 
   */
  getAuthorByAuthorId = (id) => {
    const { authors } = this.props
    let data
    for (let i = 0; i < authors.length ; i++) {
      if (authors[i].id === id) {
        data = authors[i]
        break
      }
    }
    return data
  }
  
  /**
   * 点击option，改变选中
   */
  handleChange = (value) => {
    const selected = this.state.selected

    if (!selected.includes(value)) {
      selected.push(value)
    } else {
      const index = selected.indexOf(value)
      selected.splice(index, 1)
    }

    this.setState({
      selected
    })

    this.props.onChange(selected)
  }

  /**
   * option double click event
   */
  handleDbClick = (value) => {
    const selected = this.state.selected

    if (selected.includes(value)) {
      const index = selected.indexOf(value)
      selected.splice(index, 1)
  
      this.setState({
        selected
      })
      this.props.onChange(selected)
    }

    this.props.onValueChange(value, selected, 'sub')
  }

  render() {
    const {
      value
    } = this.props

    const selected = this.state.selected

    return (
      <div className="modal-dialog-selector-wrapper">
        <select
          className="modal-dialog-selector"
          value={selected}
          multiple
          onChange={(e) => e.preventDefault()}
        >
          { 
            value && value.length > 0 ? (
              value.map((item, index) => {
                const author = this.getAuthorByAuthorId(item)
                return (
                  <option
                    className="modal-dialog-select-item"
                    value={author.id}
                    key={author.id}
                    onClick={() => this.handleChange(author.id)}
                    onDoubleClick={() => this.handleDbClick(author.id)}
                  >
                    {author.name}
                  </option> 
                )
              }) 
            ) : null
          }
        </select>
      </div>
    )
  }
}