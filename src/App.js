import React from 'react';
import Header from './components/common/Header';
import List from './components/List/List';
import Detail from './components/Detail/Detail';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header/>
          <Switch>
              <Route path="/" component={List} exact />
              <Route path="/currency/:id" component={Detail} />
          </Switch>
        </div>
      </BrowserRouter>
      
    </div>
  )
}

export default App