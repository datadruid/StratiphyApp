import AsyncStorage from '@react-native-community/async-storage';
import createDataContext from './createDataContext';
import authApi from '../api/auth';
import { navigate } from '../navigationRef';
import { getToken } from '../storage/tokenStorage'

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {...state, errorMessage : action.payload };
    case 'clear_error_message':
        return { ...state, errorMessage: '' };
    case 'list_strategies':
      return { errorMessage: '', token: action.payload };
    case 'signout':
        return { token: null, errorMessage: '' };
    default:
      return state;
  }
};


const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_error_message' });
};

const listStrategies = dispatch => async () => {
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

export const { Provider, Context } = createDataContext(
  authReducer,
  {listStrategies, clearErrorMessage},
  { token: null, errorMessage: '' }
);
