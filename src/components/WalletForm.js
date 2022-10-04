import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchWithTrunk, saveExpense } from '../redux/actions';
import getAPI from '../services/getAPI';

import '../styles/WalletForm.css';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchWithTrunk());
  }

  handleChange = ({ target }) => {
    const {
      name, value,
    } = target;
    this.setState({ [name]: value });
  };

  handleClickRegister = async () => {
    const {
      description,
      value,
      tag,
      method,
      currency,
    } = this.state;
    const { dispatch, expenses } = this.props;

    const exchangeRates = await getAPI();

    dispatch(saveExpense({
      description,
      value,
      tag,
      method,
      currency,
      id: expenses.length,
      exchangeRates,
    }));

    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  verifyBtn = () => {
    const { description, value } = this.state;
    const MIN_LENGTH = 1;

    return !(description.length >= MIN_LENGTH && value >= MIN_LENGTH);
  };

  render() {
    const {
      description,
      value,
      tag,
      method,
      currency,
    } = this.state;
    const { currencies, isLogged } = this.props;
    return (
      <div className="form-container">
        { !isLogged && <Redirect to="/" /> }
        <form className="form">
          <label htmlFor="description-input">
            Descrição
            { ' ' }
            <input
              data-testid="description-input"
              name="description"
              className="description-input"
              id="description-input"
              value={ description }
              type="text"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="tag-input">
            Categoria
            {' '}
            <select
              data-testid="tag-input"
              name="tag"
              className="tag-input"
              id="tag-input"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <label htmlFor="value-imput">
            Valor
            { ' ' }
            <input
              data-testid="value-input"
              name="value"
              className="value-imput"
              id="value-imput"
              value={ value }
              type="number"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="method-input">
            Método de pagamento
            {' '}
            <select
              data-testid="method-input"
              name="method"
              className="method-input"
              id="method-input"
              value={ method }
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="currency-input">
            Moeda
            {' '}
            <select
              name="currency"
              className="currency-input"
              id="currency-input"
              value={ currency }
              data-testid="currency-input"
              onChange={ this.handleChange }
            >
              {
                currencies && currencies.map((coin, index) => (
                  <option key={ index }>{ coin }</option>))
              }
            </select>
          </label>
        </form>
        <button
          className="button-add"
          type="button"
          onClick={ this.handleClickRegister }
          disabled={ this.verifyBtn() }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  isLogged: state.user.isLogged,
});

// const mapDispatchToProps = (dispatch) => ({
//   saveExpense: (e) => dispatch(saveExpense(e)),
// });

WalletForm.propTypes = {
  currencies: PropTypes.array,
  expenses: PropTypes.array,
  saveExpense: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
