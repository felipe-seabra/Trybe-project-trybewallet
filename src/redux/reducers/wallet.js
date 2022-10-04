import {
  GET_COINS,
  RECEIVE_COINS,
  SAVE_EXPENSE,
  REMOVE_EXPENSE,
  // EDIT_EXPENSE,
  // SAVE_EDIT_EXPENSE,
} from '../actions';
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  isFetching: false,
  total: 0,
  currency: 'USD',
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

function wallet(state = initialState, action) {
  switch (action.type) {
  case GET_COINS:
    return { ...state, isFetching: true };
  case RECEIVE_COINS:
    return { ...state, currencies: [...action.coins], isFetching: false };
  case SAVE_EXPENSE:
    return { ...state,
      expenses: [...state.expenses, action.payload],
      total: Number(state.total)
      + (Number(action.payload.value)
      * Number(action.payload.exchangeRates[action.payload.currency].ask)),
    };
  case REMOVE_EXPENSE:
    if (Number(state.total)
        - (Number(state.expenses.find((element) => element.id === action.id).value)
        * Number(state.expenses.find((element) => element.id === action.id)
          .exchangeRates[(state.expenses
            .find((element) => element.id === action.id)).currency].ask)) < 0) {
      return {
        ...state,
        total: 0,
        expenses: state.expenses.filter((element) => element.id !== action.id),
      };
    }
    return {
      ...state,
      total: Number(state.total)
      - (Number(state.expenses.find((element) => element.id === action.id).value)
      * Number(state.expenses.find((element) => element.id === action.id)
        .exchangeRates[(state.expenses
          .find((element) => element.id === action.id)).currency].ask)),
      expenses: state.expenses.filter((element) => element.id !== action.id),
    };
  // case EDIT_EXPENSE:
  //   return state;
  default:
    return state;
  }
}

export default wallet;
