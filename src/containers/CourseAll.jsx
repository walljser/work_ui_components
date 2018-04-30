import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Tabs from '@/components/Tabs';
import SearchBar from '@/components/SearchBar';
import CardList from '@/components/CardList';
import Card from '@/components/Card/index';
import Pagination from '@/components/Pagination/index';
import Modal from '@/components/Modal';
import Form from '@/components/Form/index';
import Field from '@/components/Field/index';
import TextInput from '@/components/TextInput';
import CrossSelect from '@/components/CrossSelect/index';
import FileUpload from '@/components/FileUpload';
import Textarea from '@/components/Textarea';
import Toast from '@/components/Toast';
import {
  createWork,
  getWorkByPageHelper
} from '../actions';
import Spin from '@/components/Spin/index';

@connect(
  state => ({
    authors: state.authors.authors,
    works: state.works.works,
    isPosting: state.works.isPosting,
    isFetching: state.works.isFetching,
    postErrorMessage: state.works.postErrorMessage
  }),
  dispatch => ({
    createWork: async (work) => {
      await dispatch(createWork(work))
    },
    fetchWorks: (pageNum) => {
      dispatch(getWorkByPageHelper(pageNum))
    }
  })
)
export default class CourseAll extends React.Component {
  static propTypes = {
    authors: PropTypes.array.isRequired,
    works: PropTypes.array.isRequired,
    isPosting: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    postErrorMessage: PropTypes.string.isRequired
  }

  state = {
    modalVisible: false, // 控制弹出框的显示
    forms: {}, // 表单数据初始化
    currentPage: 1 // 当前页
  }

  componentDidMount() {
    this.loadWorks()
  }

  /**
   * 获取作品列表
   * 
   * @memberof CourseAll
   */
  loadWorks = async () => {
    const {
      currentPage
    } = this.props

    await this.props.fetchWorks(currentPage)
  }

  /**
   * 搜索条件变化，当前无做处理
   * 
   * @memberof CourseAll
   */
  handleSearchValueChange = (value) => {
    // console.log(value)
  }

  /**
   * 表单数据变化
   * 
   * @memberof CourseAll
   */
  handleFormChange = (value) => {
    this.setState({
      forms: value
    })
  }

  /**
   * 当前页变化，Pagination组件绑定事件
   * 
   * @memberof CourseAll
   */
  handlePageChange = (value) => {
    this.setState({
      currentPage: value
    })

    this.loadWorks()
  }

  /**
   * 表单提交
   */
  handleSubmit = async (value) => {
    await this.props.createWork(value) 

    if (!this.props.isPosting) {
      if (this.props.postErrorMessage !== '') {
        Toast.info(this.props.postErrorMessage)
      } else {
        this.handleModalClose()
        Toast.success('创建成功')
      }
    }
  }

  /**
   * 弹出框显示
   */
  handleModalShow = () => {
    this.setState({
      modalVisible: true,
      forms: {}
    })
  }

  /**
   * 弹出框确认按钮
   */
  handleModalConfirmClick = () => {
    this.refs.form.submit()
  }

  /**
   * 弹出框关闭
   */
  handleModalClose = () => {
    this.setState({
      modalVisible: false
    })
  }

  /**
   * render里面代码太长了，把表单渲染移出来
   * 
   * @memberof CourseAll
   */
  renderForm = () => {
    const {
      authors,
      isPosting
    } = this.props

    const {
      modalVisible,
      forms
    } = this.state

    return (
      <Modal
        visible={modalVisible}
        title="新建作品"
        footerBtn="确认提交"
        footerDesc="提交后显示在班级作品区"
        handleClose={this.handleModalClose}
        handleConfirm={this.handleModalConfirmClick}
      >
        {
          isPosting ? (
            <Spin type="absolute" />
          ) : null
        }
        <Form
          state={forms}
          onChange={this.handleFormChange}
          onSubmit={this.handleSubmit}
          ref="form"
        >
          <Field fieldName="name" label="资源名称" placeholder="真实世界-泰会玩" component={TextInput}/>
          <Field fieldName="authors" label="作者" datas={authors} component={CrossSelect}/>
          <Field fieldName="image" label="配图" placeholder="点击上传图片" component={FileUpload}/>
          <Field fieldName="description" label="简介" component={Textarea}/>
        </Form>
      </Modal>
    )
  }

  render() {
    const {
      works,
      isFetching
    } = this.props

    const formDOM = this.renderForm()

    return (
      // Tab页
      <Tabs defaultActive="1"
        leftBtn="提交作品"
        rightBtn="新建作品"
        handleRightBtnEvent={this.handleModalShow}
      >
        {
          formDOM
        }
        <SearchBar onChange={this.handleSearchValueChange}/>
        <Tabs.Item tab="我的作品" id="1">
          {
            isFetching ? (
              <Spin />
            ) : (
              <CardList>
                {
                  works.length > 0 ? (
                    works.map((work, index) => {
                      return (
                        <Card
                          key={index}
                          data={work}
                        />
                      )
                    })
                  ) : null
                }
              </CardList>
            )
          }
        </Tabs.Item>
        <Tabs.Item tab="班级作品" id="2" empty />
        <Tabs.Footer>
          <Pagination
            current={1}
            total={100}
            handleChange={this.handlePageChange}
          />
        </Tabs.Footer>
      </Tabs>
    )
  }
}
