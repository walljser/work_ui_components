import React, { Component } from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import Home from './containers/Home';

/**
 * 路由，目前只配置了主页，之后可以在这里配置私有路由
 */
class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exract path="/" component={Home} />
      </Switch>
    );
  }
}

export default Routes;
