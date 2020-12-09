import createDataContext from './createDataContext';
import authApi from '../api/auth';
import { getToken } from '../storage/tokenStorage'

const strategyReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {...state, errorMessage : action.payload };
    case 'clear_error_message':
        return { ...state, errorMessage: '' };
    case 'list_strategies':
      return { ...state, errorMessage: '', strategies: action.payload };
    case 'get_instructionlist':
        return { ...state, errorMessage: '', instructions: action.payload };
    case 'get_instructiondetail':
          return { ...state, errorMessage: '', instructionDetail: action.payload };
    case 'get_strategy':
      return { errorMessage: '', strategy: action.payload };
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
        let config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        let response = await authApi.get('/strategies', config);

        
        dispatch({ type: 'list_strategies', payload: response.data });
      } catch(err) {
        dispatch({ type: 'add_error', payload: err.data.error });
      }
  } else {
    dispatch({ type: 'add_error', payload: 'No data acess token available' });
  }
};

const getStrategy = dispatch => async (strategyID) => {
  const token = await getToken();
  if (token) {
      try{
        let config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        let response = await authApi.get(`/strategy/${strategyID}`, config);
          
        dispatch({ type: 'get_strategy', payload: response.data });
      } catch(err) {
        dispatch({ type: 'add_error', payload: err.data.error });
      }
  } else {
    dispatch({ type: 'add_error', payload: 'No data acess token available' });
  }
};

const getInstructionList = dispatch => async (strategyID) => {
  const token = await getToken();
  if (token) {
      try{
        let config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        let response = await authApi.get(`/strategyinstructionlist/${strategyID}`, config);
        //console.log(response);
        dispatch({ type: 'get_instructionlist', payload: response.data });
      } catch(err) {
        dispatch({ type: 'add_error', payload: err.data.error });
      }
  } else {
    dispatch({ type: 'add_error', payload: 'No data acess token available' });
  }
};

const getInstructionDetail = dispatch => async (strategyID, date) => {
  const token = await getToken();
  if (token) {
      try{
        let config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        let response = await authApi.get(`/strategyinstructiondetail/${strategyID}/${date}`, config);

        dispatch({ type: 'get_instructiondetail', payload: response.data });
      } catch(err) {
        dispatch({ type: 'add_error', payload: err.data.error });
      }
  } else {
    dispatch({ type: 'add_error', payload: 'No data acess token available' });
  }
};

export const { Context, Provider } = createDataContext(
  strategyReducer,
  {listStrategies, getStrategy, getInstructionList, getInstructionDetail, clearErrorMessage},
  { strategies: [], strategy : {}, instructions : { latestActions :  { actions : [] }}, instructionDetail : [], errorMessage: '' }
);
