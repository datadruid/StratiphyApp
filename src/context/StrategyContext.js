import createDataContext from './createDataContext';
import authApi from '../api/auth';
import { getToken } from '../storage/tokenStorage';

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
      return { ...state, errorMessage: '', strategy: action.payload };
    case 'get_tickerdata':
      return { ...state, errorMessage: '', tickerData: action.payload };
    case 'get_comparisondata':
      return { ...state, errorMessage: '', comparisonData: action.payload }
    case 'get_compchartdata':
      return { ...state, errorMessage: '', comparisonChartData: action.payload }
    case 'get_comptickerdata':
      return { ...state, errorMessage: '', comparisonTickerData: action.payload };
    case 'toggle_compticker_list':
      if (state.compTickerList.indexOf(action.payload) !== -1) {
        return { ...state, errorMessage: '', compTickerList: state.compTickerList.filter(item => item !== action.payload) }
      }
      return { ...state, errorMessage: '', compTickerList: state.compTickerList.concat(action.payload) }
    case 'set_highlighted_item':
      return {...state, errorMessage: '', highightedItem: action.payload };
    case 'set_time_period' :
      return {...state, errorMessage: '', timePeriod : action.payload };
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
        let response = await authApi.get(`/strategies`, config);

        
        dispatch({ type: 'list_strategies', payload: response.data });
      } catch(err) {
        dispatch({ type: 'add_error', payload: err.data.error });
      }
  } else {
    dispatch({ type: 'add_error', payload: 'No data acess token available' });
  }
};

const getStrategy = dispatch => async (strategyID, timePeriod) => {
  const token = await getToken();
  if (token) {
      try{
        let config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        let response = await authApi.get(`/strategy/${strategyID}/${timePeriod}`, config);

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

const getTickerData = dispatch => async (startegies, timePeriod) =>{
  const token = await getToken();
  if (token) {
      try{
        let config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        let response = await authApi.get(`/tickerchartdata/${startegies}/${timePeriod}`, config);
        
        dispatch({ type: 'get_tickerdata', payload: response.data });
      } catch(err) {
        dispatch({ type: 'add_error', payload: err.data.error });
      }
  } else {
    dispatch({ type: 'add_error', payload: 'No data acess token available' });
  }
};

const getComparisonTickerData = dispatch => async (startegies, timePeriod) =>{
  const token = await getToken();
  if (token) {
      try{
        let config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        if(startegies.length > 0) {
        let response = await authApi.get(`/tickerchartdata/${startegies}/${timePeriod}`, config);
        dispatch({ type: 'get_comptickerdata', payload: response.data });
        } else {
          dispatch({ type: 'get_comptickerdata', payload: [] });
        }

      } catch(err) {
        dispatch({ type: 'add_error', payload: err.data.error });
      }
  } else {
    dispatch({ type: 'add_error', payload: 'No data acess token available' });
  }
};

const getComparisonChartData = dispatch => async (startegies, timePeriod) =>{
  if(startegies)
  {
    const token = await getToken();
    if (token) {
        try{
          let config = {
            headers: { Authorization: `Bearer ${token}` }
          };

          let response = await authApi.get(`/tickerchartdata/${startegies}/${timePeriod}`, config);
          
          dispatch({ type: 'get_compchartdata', payload: response.data });
        } catch(err) {
          dispatch({ type: 'add_error', payload: err.data.error });
        }
    } else {
      dispatch({ type: 'add_error', payload: 'No data acess token available' });
    }
  }
};


const getComparisonData = dispatch => async (fromDate, toDate) =>{
  const token = await getToken();
  
  if (token) {
      try{
        let config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        let response = await authApi.get(`/ftsetickerperformance/${fromDate}/${toDate}`, config);

        dispatch({ type: 'get_comparisondata', payload: response.data });
      } catch(err) {
        dispatch({ type: 'add_error', payload: err.data.error });
      }
  } else {
    dispatch({ type: 'add_error', payload: 'No data acess token available' });
  }
};

const toggleCompTickerList = dispatch => async (newTicker) =>{
  dispatch({ type: 'toggle_compticker_list', payload: newTicker });
};

const setHighightedItem = dispatch => async (newTicker) =>{
  dispatch({ type: 'set_highlighted_item', payload: newTicker });
};

const setTimePeriod = dispatch => async (periodIndex) =>{
  dispatch({ type: 'set_time_period', payload: periodIndex });
};


export const { Context, Provider } = createDataContext(
  strategyReducer,
  {listStrategies, getStrategy, getInstructionList, getInstructionDetail, getTickerData, getComparisonTickerData, getComparisonData, getComparisonChartData, toggleCompTickerList, setHighightedItem, clearErrorMessage, setTimePeriod},
  { strategies: [], strategy : { analytics: []}, tickerData : [], comparisonTickerData : [], comparisonData : [], comparisonChartData : [], compTickerList: [], instructions : [], instructionDetail : [], highightedItem : '', errorMessage: '', timePeriod : 2 }
);
