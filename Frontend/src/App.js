import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import List from './components/List';
import Detail from './components/Detail';
import { createStore, applyMiddleware } from 'redux';

import app from './reducers';
import  thunk  from 'redux-thunk';
import { Provider } from 'react-redux';

let store = createStore(app, applyMiddleware(thunk));
class App extends Component {
  render() {
    return (
		<Provider store={store}>
		<BrowserRouter>
			<Switch>
				<Route exact path='/' component={List} />
				<Route exact path='/client/update' component={Detail} />
			</Switch>
		</BrowserRouter>
		</Provider>
    );
  }
}

export default App;
