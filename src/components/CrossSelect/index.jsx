import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@/components/Dialog';
import Selector from './Selector';
import Controller from './Controller';
import Selected from './Selected';
import userAddSvg from '@/assets/svgs/user_add.svg';
import closeSvg from '@/assets/svgs/close.svg';

export default class CrossSelect extends React.Component {
  static propTypes = {
    fieldName: PropTypes.string.isRequired,
    value: PropTypes.array
  }

  state = {
    dialogVisible: false,
    currentValue: [], // 因为要点击确认才改变数据，所以保存一下当前的值
    selector: [], // 穿梭框左边的已选中内容
    selected: [] // 穿梭框右边的已选中内容
  }

  /**
   * 从表单中获取到values是，改变信息，主要为了改变会话框中的用户显示
   * @param {*} nextProps 
   * @param {*} nextState 
   */
  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        currentValue: nextProps.value || [],
        selected: []
      })
    }
  }

  /**
   * 调用Field组件传来的onChange接口
   */
  onChange = (value) => {
    this.props.onChange(value)
  }

  getErrorMessage() {
    const { errorMessage } = this.props
    return errorMessage
  }

  /**
   * 打开对话框
   */
  handleDialogOpen = (e) => {
    e.preventDefault()
    this.setState({
      dialogVisible: true
    })
  }

  /**
   * 关闭对话框
   */
  handleDialogClose = () => {
    this.setState({
      dialogVisible: false
    })
  }

  /**
   * selector change
   */
  handleSelectorChange = (value) => {
    this.setState({
      selector: value
    })
  }

  /**
   * current value selected change
   */
  handleSelectedChange = (value) => {
    this.setState({
      selected: value
    })
  }

  /**
   * 点击名字后面的叉号
   */
  handleItemDelete = (id) => {
    const {
      selected
    } = this.state
    const value = this.props.value

    if (selected.includes(id)) {
      const index = selected.indexOf(id)
      selected.splice(index, 1)
    }

    const indexOfValue = value.indexOf(id)
    value.splice(indexOfValue, 1)

    this.setState({
      currentValue: value,
      selected
    })

    this.onChange(value)
  }

  /**
   * 确认添加按钮
   */
  handleAdd = () => {
    const {
      selector,
      currentValue
    } = this.state
    // this.onChange(value)

    selector.map((item) => {
      if (!currentValue.includes(item)) {
        currentValue.push(item)
      }
      return null
    })

    this.setState({
      selector: [],
      currentValue
    })
  }

  /**
   * 删除按钮
   */
  handleDelete = () => {
    const {
      selected,
      currentValue
    } = this.state

    selected.map((item) => {
      const index = currentValue.indexOf(item)
      currentValue.splice(index, 1)

      return null
    })

    this.setState({
      selected: [],
      currentValue
    })
  }

  /**
   * 顾名思义
   */
  getAuthorByAuthorId = (id) => {
    const { datas } = this.props.passProps
    let data
    for (let i = 0; i < datas.length ; i++) {
      if (datas[i].id === id) {
        data = datas[i]
        break
      }
    }
    return data
  }

  /**
   * 当前value变化
   */
  handleCurrentChange = (value, currentSelected, action) => {
    const { currentValue } = this.state
    
    if (action === 'add' && !currentValue.includes(value)) {
      currentValue.push(value)

      this.setState({
        currentValue,
        selector: currentSelected
      })
    } 

    if (action === 'sub') {
      const index = currentValue.indexOf(value)
      currentValue.splice(index, 1)

      this.setState({
        currentValue,
        selected: currentSelected
      })
    }
  }

  /**
   * dialog footer confirm button
   * data update
   * close dialog
   */
  handleConfirm = () => {
    const {
      currentValue
    } = this.state

    this.props.onChange(currentValue)
    this.setState({
      dialogVisible: false
    })
  }

  render() {
    const {
      fieldName,
      value
    } = this.props

    const {
      label,
      datas
    } = this.props.passProps

    const currentValue = this.state.currentValue || []

    return (
      <div className="modal-form-group">
        <label htmlFor="" className="modal-form-label">
          {label}
        </label>
        <div className="modal-form-item">
          <div id="author" className="modal-author">
            <ul className="modal-author-list">
              {
                value && value.length > 0 ? (
                  value.map((item, index) => {
                    const author = this.getAuthorByAuthorId(item)
                    return (
                      <li className="modal-author-item" key={author.id}>
                        {author.name}
                        <span className="modal-author-delete" onClick={() => this.handleItemDelete(author.id)}>
                          <i className="iconfont" dangerouslySetInnerHTML={{__html: closeSvg}}/>
                        </span>
                      </li>
                    )
                  })
                ) : null
              }
            </ul>
            <p className="modal-author-empty">请选择作者</p>
          </div>
        </div>
        <button
          className="btn btn-primary modal-select-btn"
          dangerouslySetInnerHTML={{__html: userAddSvg}}
          onClick={this.handleDialogOpen}
        >
        </button>
        <Dialog
          visible={this.state.dialogVisible}
          title="班级成员"
          footerBtn="确定"
          handleClose={this.handleDialogClose}
          handleConfirm={this.handleConfirm}
        >
          <Selector
            authors={datas}
            selected={this.state.selector}
            onChange={this.handleSelectorChange}
            onValueChange={this.handleCurrentChange}
          />
          <Controller
            handleAdd={this.handleAdd}
            handleDelete={this.handleDelete}
          />
          <Selected
            name={fieldName}
            authors={datas}
            value={currentValue}
            selected={this.state.selected}
            onChange={this.handleSelectedChange}
            onValueChange={this.handleCurrentChange}
          />
        </Dialog>
      </div>
    )
  }
}