import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense } from '../redux/actions';
import '../styles/Table.css';

class Table extends Component {
  render() {
    const { expenses, removeExpenseValue } = this.props;
    return (
      <div className="table">
        <table>
          <thead className="table-head">
            <tr>
              <th>Descrição</th>
              <th className="border">Tag</th>
              <th className="border">Método de pagamento</th>
              <th className="border">Valor</th>
              <th className="border">Moeda</th>
              <th className="border">Câmbio utilizado</th>
              <th className="border">Valor convertido</th>
              <th className="border">Moeda de conversão</th>
              <th className="border">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((expense) => {
                const {
                  description,
                  value,
                  tag,
                  method,
                  currency,
                  id,
                  exchangeRates,
                } = expense;
                return (
                  <tr className="table-body" key={ id }>
                    <td>{description}</td>
                    <td>{tag}</td>
                    <td>{method}</td>
                    <td>{Number(value).toFixed(2)}</td>
                    <td>{exchangeRates[currency].name}</td>
                    <td>{Number((exchangeRates[currency].ask)).toFixed(2)}</td>
                    <td>
                      {(Number(value)
                  * Number(exchangeRates[currency].ask)).toFixed(2)}
                    </td>
                    <td>Real</td>
                    <td>
                      <button
                        data-testid="edit-btn"
                        className="btn-edit"
                        type="button"
                        // onClick={ () => editExpenseValue(id) }
                      >
                        Editar
                      </button>
                      <button
                        data-testid="delete-btn"
                        className="btn-del"
                        type="button"
                        onClick={ () => removeExpenseValue(id) }
                      >
                        Deletar
                      </button>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpenseValue: (id) => dispatch(removeExpense(id)),
  // editExpenseValue: (id) => dispatch(editExpense(id)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  removeExpenseValue: PropTypes.func.isRequired,
}.isRequired;

Table.defaultProps = {
  expenses: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
