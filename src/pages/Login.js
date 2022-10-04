import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login as loginAction } from '../redux/actions';
import logoTrybeWallet from '../images/logoTrybeWallet.svg';
import '../styles/Login.css';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target }) => {
    const {
      name, value,
    } = target;
    this.setState({ [name]: value });
  };

  verifyBtn = () => {
    const { email, password } = this.state;
    const MIN_LENGTH = 6;
    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    return !(password.length >= MIN_LENGTH && emailRegex.test(email));
  };

  render() {
    const { isLogged, login } = this.props;
    const { email, password } = this.state;
    return (
      <div className="login">
        { isLogged && <Redirect to="/carteira" /> }
        <img src={ logoTrybeWallet } alt="logo Trybe Wallet" />
        <div>
          <section className="login-inputs">
            <input
              type="email"
              placeholder="E-mail"
              data-testid="email-input"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
            {/* {!verifyEmail && <span>Insira um e-mail válido</span>} */}
            <input
              type="password"
              placeholder="Senha"
              data-testid="password-input"
              name="password"
              value={ password }
              onChange={ this.handleChange }
            />
            {/* {!verifyPass && <span>Insira uma senha de no mínimo 6 caracteres</span>} */}
          </section>
          <div className="link">
            <button
              type="button"
              onClick={ () => login(email) }
              disabled={ this.verifyBtn() }
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLogged: state.user.isLogged,
});

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(loginAction(email)),
});

Login.propTypes = {
  isLogged: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
