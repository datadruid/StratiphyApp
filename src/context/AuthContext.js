import AsyncStorage from '@react-native-community/async-storage';
import createDataContext from './createDataContext';
import authApi from '../api/auth';
import { navigate } from '../navigationRef';

const TOKEN_KEY = 'token';
const REFESH_TOKEN_KEY = 'refreshtoken';
const FULL_NAME_KEY = 'fullnamekey'
const AUTH0_ID_KEY = 'auth0idkey'

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

const linkAccount = dispatch => async ({ email, password }) => {
  if (!email) {
    dispatch({
      type: 'add_error',
      payload: 'You must provide an email.'
    });
    return;
  }
  if (!password) {
    dispatch({
      type: 'add_error',
      payload: 'You must provide your password.'
    });
    return;
  }
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  if (token) {
      try{
      const response = await authApi.post('/linkuseremail', { email, password }, {headers: { Authorization: `Bearer ${token}` }});
      console.log(response.data);
    } catch (err){
      dispatch({
        type: 'add_error',
        payload: err.response.data.error
      });
      console.log(err.response.data.error);
      throw new Error(err);
    }
  } 
};

const updateUser = async () => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  const name = await AsyncStorage.getItem(FULL_NAME_KEY, name);
  const auth_id = await AsyncStorage.getItem(AUTH0_ID_KEY, auth_id);
  if (token) {
    try {
      const response = await authApi.post('/updateuser', { name, auth_id }, {headers: { Authorization: `Bearer ${token}` }});
      await AsyncStorage.removeItem(AUTH0_ID_KEY);
      await AsyncStorage.removeItem(FULL_NAME_KEY);
    } catch (err){
      throw new Error(err);
    }
  } 
};

const verifyCode = dispatch => async ({ code, email, auth_id }) => {
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
    await AsyncStorage.setItem(AUTH0_ID_KEY, auth_id);
    await updateUser();
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
      navigate('CodeScreen', { email, auth_id: response.data._id });
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
      navigate('CodeScreen', { email, auth_id: response.data._id });
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
  {signup, signin, signout, verifyCode, tryLocalSignin, linkAccount, clearErrorMessage},
  { token: null, errorMessage: '' }
);
