import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';


class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      btnDisable: true,
      loading: false,
    };
   
    this.clickButton = this.clickButton.bind(this)
  }

 /*  getInputValue = ({ target }) => {
    const { name } = this.state;
    const minNumber = 2;

    this.setState({
      name: target.value,
    }, () => {
      if  (name.length < minNumber) {
        this.setState({
          btnDisable: true,
        });
      } else {
        this.setState({
          btnDisable: false,
        });
      }
    });
  } */

  getInputValue = ({ target }) => {
    const minNumber = 3
    this.setState({
      name: target.value,
    }, () => {
      const { name } = this.state
      if(name.length < minNumber) {
        this.setState({
          btnDisable: true,
        })
      } else {
        this.setState({
          btnDisable: false,
        })
      }
    })
  }

    
  clickButton(e) {
    e.preventDefault()
    const { history } = this.props;
  
     this.setState({
       loading: true,
     }, async () => {
       const { name } = this.state
       await createUser({ name })
       history.push("/search")
       this.setState({
         loading: false,
       })
     });
   }

   render() {
     const { btnDisable, loading } = this.state;
     return (
       <div data-testid="page-login">
         <h1>Login</h1>
         { loading ? <Loading /> : (
           <form action="">
           <label htmlFor="input-name">
             <input
               id="input-name"
               name="name"
               data-testid="login-name-input"
               onChange={ this.getInputValue }
             />
           </label>

           <button
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
     );
   }
}

Login.propTypes = {
  valueInput: PropTypes.string,
  createUser: PropTypes.func,
  loading: PropTypes.bool,
}.isRequired;

export default Login;
