import AsyncStorage from '@react-native-community/async-storage';
import createDataContext from './createDataContext';
import authApi from '../api/auth';
import { navigate } from '../navigationRef';
import { getToken, setToken, removeToken, setRefreshToken, removeRefreshToken, getAuth0Token, setAuth0Token, removeAuth0Token } from '../storage/tokenStorage'
import { getName, setName, removeName} from '../storage/userStorage'

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
  const token = await getToken();
  if (token) {
    dispatch({ type: 'signin', payload: token });
    navigate('StrategyList');
  } else {
    navigate('Signup');
  }
};

const updateEmailPasswordUser = async (email, password) => {
  const token = await getToken();
  const name = await getName();
  const auth_id = await getAuth0Token(auth_id);
  if (token) {
    try {
      if(password) {
        const linkResponse = await authApi.post('/linkuseremail', { email, password }, {headers: { Authorization: `Bearer ${token}` }});
      }
      const response = await authApi.post('/updateuser', { name, auth_id }, {headers: { Authorization: `Bearer ${token}` }});
      //await removeAuth0Token();
      //await removeName();
    } catch (err){
      throw new Error(err);
    }
  } 
};

const updateGoogleUser = async (googleCode) => {
  const token = await getToken();
  const name = await getName();
  const auth_id = await getAuth0Token(auth_id);
  if (token) {
    try {
      if(googleCode){
        const linkResponse = await authApi.post('/linkusergoogle', { code: googleCode }, {headers: { Authorization: `Bearer ${token}` }});
      }
      const response = await authApi.post('/updateuser', { name, auth_id }, {headers: { Authorization: `Bearer ${token}` }});
      //await removeAuth0Token();
      //await removeName();
    } catch (err){
      throw new Error(err);
    }
  } 
};

const verifyCode = dispatch => async ({ code, email, password, googleCode, auth_id }) => {
  try {
    if (!code) {
      dispatch({
        type: 'add_error',
        payload: 'You must provide a code.'
      });
      return;
    }

    let response = await authApi.post('/verifycode', { email, code });
    await setRefreshToken(response.data.refresh_token);
    await setToken(response.data.id_token);
    await setAuth0Token(auth_id);
    if(googleCode) {
      await updateGoogleUser(googleCode);
    } else if(email && password) {
      await updateEmailPasswordUser(email, password);
    }
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

const signinPassword = dispatch => async ({ name, email, password }) => {
  await setName(name);
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
        payload: 'You must provide a name.'
      });
      return;
    }
    if (!password) {
      dispatch({
        type: 'add_error',
        payload: 'You must provide a password.'
      });
      return;
    }
    let running = false;
    if(!running)
    {
      running = true;
      const response = await authApi.post('/signinpassword', { email, password });
      running = false;
      navigate('CodeScreen', { email, password, auth_id: response.data._id });
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

const signinGoogle = dispatch => async ({ email, name, code }) => {
  await setName(name);
  try {
    if (!code) {
      dispatch({
        type: 'add_error',
        payload: 'Google Authentication error.'
      });
      return;
    }
    let running = false;
    if(!running)
    {
      running = true;
      const response = await authApi.post('/signingoogle', { email, code });
      running = false;
      navigate('CodeScreen', { email, code, auth_id: response.data._id });
    }
    
  } catch (err) {
    running = false;
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign in'
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
      await setName(name);
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
  await removeToken();
  await removeRefreshToken();
  dispatch({ type: 'signout' });
  navigate('loginFlow');
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {signup, signin, signinPassword, signinGoogle, signout, verifyCode, tryLocalSignin, clearErrorMessage},
  { token: null, errorMessage: '' }
);
