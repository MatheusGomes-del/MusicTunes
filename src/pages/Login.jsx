import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import user from '../images/user.png';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      btnDisable: true,
      loading: false,
    };

    this.clickButton = this.clickButton.bind(this);
  }

  getInputValue = ({ target }) => {
    const minNumber = 3;
    this.setState({
      name: target.value,
    }, () => {
      const { name } = this.state;
      if (name.length < minNumber) {
        this.setState({
          btnDisable: true,
        });
      } else {
        this.setState({
          btnDisable: false,
        });
      }
    });
  }

  clickButton(e) {
    e.preventDefault();
    const { history } = this.props;

    this.setState({
      loading: true,
    }, async () => {
      const { name } = this.state;
      await createUser({ name });
      history.push('/search');
      this.setState({
        loading: false,
      });
    });
  }

  render() {
    const { btnDisable, loading } = this.state;
    return (
      <section data-testid="page-login">
        <div id="box-login">
          <div>
            <img src={ user } alt="icon-user" />
          </div>
          { loading ? <Loading /> : (
            <form>
              <label htmlFor="input-name">
                <i className="bi bi-person" />
                <input
                  id="input-name"
                  name="name"
                  placeholder="User Name"
                  data-testid="login-name-input"
                  onChange={ this.getInputValue }
                />
              </label>
              <button
                className="bg-cyan-500 shadow-lg shadow-cyan-500/50 ..."
                disabled={ btnDisable }
                data-testid="login-submit-button"
                type="submit"
                onClick={ this.clickButton }
              >
                Entrar
              </button>
            </form>
          )}
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  valueInput: PropTypes.string,
  createUser: PropTypes.func,
  loading: PropTypes.bool,
}.isRequired;

export default Login;
