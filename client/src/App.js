
import React, { Component } from 'react'
import Index from './components/index'
import Error from './components/errorpage'
import Custom from './components/custom'
import { Route, Router, Switch } from "react-router-dom";
import store from './axios/store';
import { Provider } from "react-redux";
import history from './history';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch location={this.props.location}>
            <Route path="/" exact component={Index} />
            {/* <Route path="/:slug" exact component={Details} /> */}
            <Route path="/custom-cocktails" exact component={Custom} />
            <Route exact component={Error} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App;