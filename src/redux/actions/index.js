// Coloque aqui suas actions
import getAPI from '../../services/getAPI';

export const LOGIN = 'LOGIN';

export const GET_COINS = 'GET_API';
export const RECEIVE_COINS = 'RECEIVE_COINS';

export const SAVE_EXPENSE = 'SAVE_EXPENSE';

export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const SAVE_EDIT_EXPENSE = 'SAVE_EDIT_EXPENSE';

export const login = (email) => ({ type: LOGIN, email });
export const wallet = (walletForm) => (
  { type: ADD_WALLET, walletForm }
);

export const actFetchAPI = () => ({ type: GET_COINS });
export const actReceiveAPI = (coins) => ({
  type: RECEIVE_COINS,
  coins,
});

export const fetchWithTrunk = () => (dispatch) => {
  dispatch(actFetchAPI());
  return (
    getAPI()
      .then((data) => {
        const coins = Object.keys(data).filter((curr) => curr !== 'USDT');
        dispatch(actReceiveAPI(coins));
      })
  );
};

export const saveExpense = (payload) => ({ type: SAVE_EXPENSE, payload });

export const fetchExchange = (coins) => ({ type: FETCH_EXCHANGE, coins });

export const removeExpense = (id) => ({ type: REMOVE_EXPENSE, id });

export const editExpense = (id) => ({ type: EDIT_EXPENSE, id });

export const saveEditExpense = (id) => ({ type: SAVE_EDIT_EXPENSE, id });
