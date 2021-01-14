import AsyncStorage from '@react-native-community/async-storage';
import createDataContext from './createDataContext';
import authApi from '../api/auth';
import { navigate } from '../navigationRef';
import { getToken, setToken, removeToken, setRefreshToken, removeRefreshToken, getAuth0Token, setAuth0Token, removeAuth0Token } from '../storage/tokenStorage'
import { getFirstName, setFirstName, removeFirstName, getLastName, setLastName, removeLastName, getEmail, setEmail, removeEmail, getIntroShown, setIntroShown } from '../storage/userStorage'

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'clear_error_message':
      return { ...state, errorMessage: '' };
    case 'signup':
      return { errorMessage: '', token: action.payload };
    case 'signout':
      return { token: null, errorMessage: '', isApproved: false, hasAuthId: false };
    case 'set_approved':
      return { ...state, isApproved: action.payload };
    case 'set_has_authid':
      return { ...state, hasAuthId: action.payload };
    case 'set_auth_id':
      return { ...state, auth_id: action.payload };
    case 'set_user_id':
      return { ...state, userId: action.payload };
    default:
      return state;
  }
};


const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_error_message' });
};

const tryLocalSignin = dispatch => async () => {
  const token = await getToken();
  console.log(token);
  if (token) {
    dispatch({ type: 'signin', payload: token });
    navigate('StrategyList');
  } else {
    setIntroShown('false');
    if (await getIntroShown()) {
      navigate('StartSignin');
    } else {
      navigate('Start');
    }
  }
};

const updateEmailPasswordUser = dispatch => async (email, password, hasAuthId) => {
  const token = await getToken();
  if (token) {
    try {
      if (password) {
        const linkResponse = await authApi.post('/linkuseremail', { email, password }, { headers: { Authorization: `Bearer ${token}` } });
      }
      if (hasAuthId) {
        navigate('StrategyList');
      } else {
        navigate('AddName');
      }
    } catch (err) {
      dispatch({
        type: 'add_error',
        payload: err.response.data.error
      });
    }
  }
};

const updateGoogleUser = dispatch => async (googleCode, firstName, lastName, userId) => {
  const token = await getToken();
  const auth_id = await getAuth0Token();
  const email = await getEmail();
  const emailVerified = true;
  
  if (token) {
    try {
      if (googleCode) {
        const linkResponse = await authApi.post('/linkusergoogle', { code: googleCode }, { headers: { Authorization: `Bearer ${token}` } });
        const response = await authApi.post('/updateuser', { firstName, lastName, email, auth_id, userId, emailVerified }, { headers: { Authorization: `Bearer ${token}` } });
      }

    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
  navigate('StrategyList');
};

const verifyCode = dispatch => async ({ code, email, auth_id, isApproved, hasAuthId, userId}) => {
  console.log(code, email, auth_id, isApproved, hasAuthId, userId);
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
    await setEmail(email);

    dispatch({
      type: 'signup',
      payload: response.data.id_token
    });
    if (isApproved && !hasAuthId) {
      navigate('Signin', { hasAuthId, userId });
    } else if (!hasAuthId) {
      navigate('AddName');
    } else {
      response = await authApi.post('/updateemail', { email }, { headers: { Authorization: `Bearer ${response.data.id_token}` } });
      navigate('StrategyList');
    }

  } catch (err) {
    console.log('error');
    console.log(err.response.data.error);
    dispatch({
      type: 'add_error',
      payload: err.response.data.error
    });
    throw new Error(err);
  }

};

const addname = dispatch => async ({ firstName, lastName, userId }) => {
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
    const email = await getEmail();
    const token = await getToken();
    const auth_id = await getAuth0Token();
    const emailVerified = true;

    if (token) {
      const response = await authApi.post('/updateuser', { firstName, lastName, email, auth_id, user_id: userId, emailVerified }, { headers: { Authorization: `Bearer ${token}` } });
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

const repeatemail = dispatch => async (email) => {
  let running = false;
  try {
    if (!running) {
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

const signup = dispatch => async (email) => {
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
    let hasAuthId = false;

    if (!running) {
      running = true;
      const signinResponse = await authApi.post('/signin', { email });

      let userInfo = signinResponse.data;

      dispatch({
        type: 'set_auth_id',
        payload: userInfo._id
      });

      const userStatusResponse = await authApi.post('/userstatus',
        {
          email: email
        });

      if (userStatusResponse.data) {
        hasAuthId = userStatusResponse.data.hasAuthId;
        isApproved = userStatusResponse.data.isApproved;
        dispatch({
          type: 'set_approved',
          payload: userStatusResponse.data.isApproved
        });
        dispatch({
          type: 'set_has_authid',
          payload: userStatusResponse.data.hasAuthId
        });
        dispatch({
          type: 'set_user_id',
          payload: userStatusResponse.data.userId
        });

      }
      running = false;
    }
  } catch (err) {
    running = false;
    console.log({ err });
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign up'
    });
  }
};

const setError = dispatch => async (errortext) => {
  dispatch({
    type: 'add_error',
    payload: errortext
  });
};

const signout = dispatch => async () => {
  await removeToken();
  await removeRefreshToken();
  dispatch({ type: 'signout' });
  navigate('loginFlow');
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signup, repeatemail, addname, updateEmailPasswordUser, updateGoogleUser,
    signout, verifyCode, tryLocalSignin, clearErrorMessage, setError
  },
  { token: null, errorMessage: '', isApproved: false, hasAuthId: false, userId: '' }
);
