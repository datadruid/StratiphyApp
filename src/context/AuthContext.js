import AsyncStorage from '@react-native-community/async-storage';
import createDataContext from './createDataContext';
import authApi from '../api/auth';
import { navigate } from '../navigationRef';

const TOKEN_KEY = 'token';
const REFESH_TOKEN_KEY = 'refreshtoken';
const FULL_NAME_KEY = 'fullnamekey'

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {...state, errorMessage : action.payload };
    case 'clear_error_message':
        return { ...state, errorMessage: '' };
    case 'signup':
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

const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  if (token) {
    dispatch({ type: 'signin', payload: token });
    navigate('StrategyList');
  } else {
    navigate('Signup');
  }
};

const verifyCode = dispatch => async ({ code, email }) => {
  try {
    if (!code) {
      dispatch({
        type: 'add_error',
        payload: 'You must provide a code.'
      });
      return;
    }

    const response = await authApi.post('/verifycode', { email, code });
    await AsyncStorage.setItem(REFESH_TOKEN_KEY, response.data.refresh_token);
    await AsyncStorage.setItem(TOKEN_KEY, response.data.id_token);
    dispatch({
      type: 'signup',
      payload: response.data.id_token
    });
    navigate('StrategyList');
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: err.response.data.error
    });
    throw new Error(err);
  }
};

const signin = dispatch => async ({ email }) => {
  console.log(email);
  try {
    if (!email) {
      dispatch({
        type: 'add_error',
        payload: 'You must provide an email.'
      });
      return;
    }
    let running = false;
    if(!running)
    {
      running = true;
      const response = await authApi.post('/signin', { email });
      running = false;
      navigate('CodeScreen', { email });
    }
    
  } catch (err) {
    running = false;
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign up'
    });
    throw new Error(err);
  }
};

const signup = dispatch => async ({ email, name }) => {
  try {
    if (!email) {
      dispatch({
        type: 'add_error',
        payload: 'You must provide an email.'
      });
      return;
    }
    if (!name) {
      dispatch({
        type: 'add_error',
        payload: 'You must provide your name.'
      });
      return;
    }
    let running = false;
    if(!running)
    {
      const response = await authApi.post('/signin', { email });
      await AsyncStorage.setItem(FULL_NAME_KEY, name);
      running = false;
      navigate('CodeScreen', { email });
    }
  } catch (err) {
    running = false;
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign up'
    });
  }
};

const signout = dispatch => async () => {
  await AsyncStorage.removeItem(TOKEN_KEY);
  await AsyncStorage.removeItem(REFESH_TOKEN_KEY);
  dispatch({ type: 'signout' });
  navigate('loginFlow');
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {signup, signin, signout, verifyCode, tryLocalSignin, clearErrorMessage},
  { token: null, errorMessage: '' }
);
