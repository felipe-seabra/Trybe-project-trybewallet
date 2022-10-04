import { LOGIN } from '../actions';
// Esse reducer será responsável por tratar as informações da pessoa usuária

const initialState = {
  email: '', // string que armazena o email da pessoa usuária
  isLogged: false,

};

function user(state = initialState, action) {
  switch (action.type) {
  case LOGIN:
    return { ...state, email: action.email, isLogged: true };
  default:
    return state;
  }
}

export default user;
