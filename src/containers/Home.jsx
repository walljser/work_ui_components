import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllAuthors } from '../actions';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import CourseAll from './CourseAll';

@connect(
  state => ({
    authors: state.authors.authors
  }),
  dispatch => ({
    loadAuthors: () => dispatch(getAllAuthors())
  })
)
export default class Home extends React.Component {
  componentDidMount() {
    this.props.loadAuthors()
  }

  render() {
    const pathname = this.props.location.pathname

    return (
      <div className="page">
        <Header />
        <Sidebar title="课程列表">
          <Sidebar.Item to="/course/all" active={pathname === "/course/all"}>
            全部课程
          </Sidebar.Item>
          <Sidebar.Item to="/course/One" active={pathname === "/course/One"}>
            课程一：静夜思
          </Sidebar.Item>
          <Sidebar.Item to="/course/Two" active={pathname === "/course/Two"}>
            课程二：红军长征
          </Sidebar.Item>
          <Sidebar.Item to="/course/Three" active={pathname === "/course/Three"}>
            课程三：活字印刷
          </Sidebar.Item>
          <Sidebar.Item to="/course/Four" active={pathname === "/course/Four"}>
            课程四：郑和下西洋
          </Sidebar.Item>
          <Sidebar.Item to="/course/Five" active={pathname === "/course/Five"}>
            课程五：梦想之家
          </Sidebar.Item>
        </Sidebar>

        <Route path="/course/all" component={CourseAll}/>
        {/* <Route path="/course/one" component={CourseAll}/>
        <Route path="/course/two" component={CourseAll}/>
        <Route path="/course/three" component={CourseAll}/>
        <Route path="/course/four" component={CourseAll}/>
        <Route path="/course/five" component={CourseAll}/> */}
      </div>
    )
  }
}