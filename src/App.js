import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <Router>
        <p>TrybeTunes</p>
        <Switch>
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/" component={ Login } />
          <Route exact path="*" component={ NotFound } />
        </Switch>
      </Router>
    );
  }
}

export default App;
