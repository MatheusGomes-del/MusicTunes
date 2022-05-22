import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      load: false,
    };
  }

  componentDidMount() {
    this.setState({
      load: true,
    }, async () => {
      const user = await getUser();
      this.setState({
        load: false,
        userName: user.name,
      });
    });
  }

  render() {
    const { userName, load } = this.state;
    return (
      <div>
        <header data-testid="header-component">
          {load ? (<Loading />) : (
            <p data-testid="header-user-name">
              Bem vindo(a)
              {' '}
              { userName }
              !
            </p>
          )}
          <Link to="/search" data-testid="link-to-search">search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">profile</Link>

        </header>
      </div>
    );
  }
}

export default Header;
