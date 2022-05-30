import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';
import nameLogo from '../images/nameLogo-removebg-preview.png';

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
        <header
          data-testid="header-component"
          className="container-header
         bg-gradient-to-r
         from-indigo-500 via-purple-500 to-pink-500"
        >
          <div>
            <img src={ nameLogo } alt="name-of-logo" className="img-logo-header" />
          </div>
          {load ? (<Loading />) : (
            <div className="square">
              <p data-testid="header-user-name">
                Bem vindo(a)!
                {' '}
                {userName}
                !
              </p>
            </div>
          )}
        </header>
        <div className="links grid grid-cols-3 divide-x">
          <Link
            to="/search"
            data-testid="link-to-search"
          >
            search

          </Link>
          <Link to="/favorites" data-testid="link-to-favorites">favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">profile</Link>
        </div>
      </div>
    );
  }
}

export default Header;
