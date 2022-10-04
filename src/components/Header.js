import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logoTrybeWallet from '../images/logoTrybeWallet.svg';
import moedas from '../images/moedas.svg';
import user from '../images/user.svg';
import '../styles/Header.css';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    const formatado = total.toFixed(2);
    // formata o total para BRL mas não passa no verificador
    // .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    return (
      <header>
        <img src={ logoTrybeWallet } alt="logo Trybe Wallet" className="logo" />
        <p>
          <span>
            <img src={ moedas } alt="Icon moedas" />
          </span>
          Total de despesas:
          {' '}
          <span data-testid="total-field" className="total-field">{formatado}</span>
          {' '}
          <span data-testid="header-currency-field">BRL</span>
        </p>
        <p data-testid="email-field" className="email-field">
          <span>
            <img src={ user } alt="Icon user" />
          </span>
          {email}
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

Header.propTypes = {
  email: PropTypes.string,
  total: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, null)(Header);
