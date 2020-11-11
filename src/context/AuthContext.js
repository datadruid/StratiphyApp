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

const updateEmailPasswordUser = dispatch => async (email, password, hasName) => {
  const token = await getToken();
  const auth_id = await getAuth0Token(auth_id);
  if (token) {
    try {
      if(password) {
        const linkResponse = await authApi.post('/linkuseremail', { email, password }, {headers: { Authorization: `Bearer ${token}` }});
      }
      if(hasName){
        navigate('StrategyList');
      } else {
        navigate('AddName');
      }
    } catch (err){
      dispatch({
        type: 'add_error',
        payload: err.response.data.error
      });
    }
  } 
};

const updateGoogleUser = dispatch => async (googleCode, firstName, lastName) => {
  const token = await getToken();
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
      console.log(err);
      throw new Error(err);
    }
  } 
  navigate('StrategyList');
};

const verifyCode = dispatch => async ({ code, email, auth_id, isApproved, hasName }) => {
  const token = await getToken();
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
    dispatch({
      type: 'signup',
      payload: response.data.id_token
    });
    if (isApproved && !hasName) {
      console.log('sign in');
      navigate('Signin', { hasName });
    } else if(!hasName) {
      navigate('AddName');
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

const addname = dispatch => async ({ firstName, lastName }) => {
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
    const token = await getToken();
    const auth_id = await getAuth0Token();
    if (token) {
        const response = await authApi.post('/updateuser', { firstName, lastName, auth_id }, {headers: { Authorization: `Bearer ${token}` }});
        //await removeAuth0Token();
        //await removeName();
      } 
      navigate('StrategyList');
    
  } catch (err) {
    running = false;
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign up'
    });
    throw new Error(err);
  }
};

const repeatemail = dispatch => async ({ email }) => {
  let running = false;
  try{
    if(!running)
    {
      running = true;
      const signinResponse = await authApi.post('/signin', { email });
      let userInfo = signinResponse.data;
      running = false;
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
      running = true;
      const signinResponse = await authApi.post('/signin', { email });
      let userInfo = signinResponse.data;
      
      const userStatusResponse = await authApi.post('/userstatus', 
      { 
        email: email, 
        authId: userInfo._id
      });

      if(userStatusResponse.data)
      {
        hasName =userStatusResponse.data.hasFirstName;
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
  {signup, repeatemail, addname, updateEmailPasswordUser, updateGoogleUser, signout, verifyCode, tryLocalSignin, clearErrorMessage},
  { token: null, errorMessage: '', isApproved : false, hasName : false }
);
