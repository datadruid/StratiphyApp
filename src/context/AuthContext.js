import AsyncStorage from '@react-native-community/async-storage';
import createDataContext from './createDataContext';
import authApi from '../api/auth';
import { navigate } from '../navigationRef';
import { getToken, setToken, removeToken, setRefreshToken, removeRefreshToken, getAuth0Token, setAuth0Token, removeAuth0Token } from '../storage/tokenStorage'
import { getFirstName, setFirstName, removeFirstName, getLastName, setLastName, removeLastName} from '../storage/userStorage'

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {...state, errorMessage : action.payload };
    case 'clear_error_message':
        return { ...state, errorMessage: '' };
    case 'signup':
      return { errorMessage: '', token: action.payload };
    case 'signout':
        return { token: null, errorMessage: '', isApproved: false, hasName: false };
     case 'set_approved':
        return { ...state, isApproved : action.payload };
     case 'set_has_name':
        return { ...state, hasName : action.payload };
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
  const firstName = await getFirstName();
  const lastName = await getLastName();
  const auth_id = await getAuth0Token(auth_id);
  if (token) {
    try {
      if(password) {
        const linkResponse = await authApi.post('/linkuseremail', { email, password }, {headers: { Authorization: `Bearer ${token}` }});
      }
      const response = await authApi.post('/updateuser', { firstName, lastName, auth_id }, {headers: { Authorization: `Bearer ${token}` }});
      //await removeAuth0Token();
      //await removeName();
    } catch (err){
      throw new Error(err);
    }
  } 
};

const updateGoogleUser = async (googleCode) => {
  const token = await getToken();
  const firstName = await getFirstName();
  const lastName = await getLastName();
  const auth_id = await getAuth0Token(auth_id);
  if (token) {
    try {
      if(googleCode){
        const linkResponse = await authApi.post('/linkusergoogle', { code: googleCode }, {headers: { Authorization: `Bearer ${token}` }});
      }
      const response = await authApi.post('/updateuser', { firstName, lastName, auth_id }, {headers: { Authorization: `Bearer ${token}` }});
      //await removeAuth0Token();
      //await removeName();
    } catch (err){
      throw new Error(err);
    }
  } 
};

const verifyCode = dispatch => async ({ code, email, auth_id, isApproved, hasName }) => {
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
    // if(googleCode) {
    //   await updateGoogleUser(googleCode);
    // } else if(email && password) {
    //   await updateEmailPasswordUser(email, password);
    // }
    dispatch({
      type: 'signup',
      payload: response.data.id_token
    });
    if(!hasName) {
      navigate('AddName',{ isApproved });
    } else if (isApproved) {
      navigate('SignIn');
    } else {
      navigate('StrategyList');
    }
  
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: err.response.data.error
    });
    throw new Error(err);
  }

};

const addname = dispatch => async ({ firstName, lastName, isApproved }) => {
  try {
    if (!firstName) {
      dispatch({
        type: 'add_error',
        payload: 'You must enter your first name.'
      });
      return;
    }
    if (!lastName) {
      dispatch({
        type: 'add_error',
        payload: 'You must enter your last name.'
      });
      return;
    }
    await setFirstName(firstName);
    await setLastName(lastName);
    if(isApproved){
      navigate('Signin');
    } else {
      // need to add to Realm
      navigate('StrategyList');
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

const signinPassword = dispatch => async ({ email, password }) => {
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

const signinGoogle = dispatch => async ({ email, code }) => {
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

const signup = dispatch => async ({ email }) => {
  try {
    if (!email) {
      dispatch({
        type: 'add_error',
        payload: 'You must provide an email.'
      });
      return;
    }
    let running = false;
    let isApproved = false;
    let hasName = false;

    if(!running)
    {
      const signinResponse = await authApi.post('/signin', { email });
      let userInfo = signinResponse.data;
      
      console.log('get user status');
      const userStatusResponse = await authApi.post('/userstatus', 
      { 
        email: email, 
        authId: userInfo._id
      });

      if(userStatusResponse.data)
      {
        hasName=userStatusResponse.data.hasName;
        isApproved= userStatusResponse.data.isApproved;

        dispatch({
          type: 'set_approved',
          payload: userStatusResponse.data.isApproved
        });
        dispatch({
          type: 'set_has_name',
          payload: userStatusResponse.data.hasName
        });
      }
      running = false;
      navigate('CodeScreen', { email, auth_id: userInfo._id, isApproved, hasName });
    }
  } catch (err) {
    running = false;
    console.log(err);
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
  {signup, addname, signinPassword, signinGoogle, signout, verifyCode, tryLocalSignin, clearErrorMessage},
  { token: null, errorMessage: '', isApproved : false, hasName : false }
);
