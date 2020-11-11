import createDataContext from './createDataContext';
import authApi from '../api/auth';
import { navigate } from '../navigationRef';
import { getToken } from '../storage/tokenStorage'

const strategyReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {...state, errorMessage : action.payload };
    case 'clear_error_message':
        return { ...state, errorMessage: '' };
    case 'list_strategies':
      return { errorMessage: '', strategies: action.payload };
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
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const response = await authApi.get('/strategies', config);

        
        dispatch({ type: 'list_strategies', payload: response.data });
        // const testData = [
        //   {title: 'one'},
        //   {title:'two'}
        // ];
        // dispatch({ type: 'list_strategies', payload: testData });
      } catch(err) {
        dispatch({ type: 'add_error', payload: err.data.error });
      }
  } else {
    dispatch({ type: 'add_error', payload: 'No data acess token available' });
  }
};

export const { Context, Provider } = createDataContext(
  strategyReducer,
  {listStrategies, clearErrorMessage},
  { strategies: [], errorMessage: '' }
);
