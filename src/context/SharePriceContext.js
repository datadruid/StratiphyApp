import createDataContext from './createDataContext';
import { getToken } from '../storage/tokenStorage'

const API_KEY = '29c6d080dab360dd0b5d73eb6e28936e';

const sharePriceReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {...state, errorMessage : action.payload };
    case 'clear_error_message':
        return { ...state, errorMessage: '' };
    case 'list_strategies':
      return { errorMessage: '', token: action.payload };
    default:
      return state;
  }
};


const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_error_message' });
};

const listPrices = dispatch => async () => {
  const token = await getToken();
  if (token) {
      try{
    const response = await authApi.get('/strategies');
    dispatch({ type: 'list_strategies', payload: response.data });
      } catch(err) {
        dispatch({ type: 'add_error', payload: err.data.error });
      }
  } else {
    dispatch({ type: 'add_error', payload: 'No data acess token available' });
  }
};

export const { Context, Provider } = createDataContext(
    sharePriceReducer,
  {listPrices, clearErrorMessage},
  { sharePrices: [], errorMessage: '' }
);