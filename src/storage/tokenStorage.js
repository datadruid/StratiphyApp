import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from "jwt-decode";
import authApi from '../api/auth';

const TOKEN_KEY = 'token';
const REFESH_TOKEN_KEY = 'refreshtoken';
const AUTH0_ID_KEY = 'auth0idkey'

export async function getToken() {
    let token = await AsyncStorage.getItem(TOKEN_KEY);
    if(token){
        let decoded = jwt_decode(token);
        let date = new Date(decoded.exp * 1000);
        let millis = date - Date.now();
        let hoursLeft = Math.floor(millis / 3600000);
        if(hoursLeft < 1)
        {
            try{
                var refreshtoken = await AsyncStorage.getItem(REFESH_TOKEN_KEY);
                if(refreshtoken) {
                    const refreshResponse = await authApi.post('/refresh', { refreshtoken });
                    await setRefreshToken(refreshResponse.data.refresh_token);
                    await setToken(refreshResponse.data.id_token);
                    return refreshResponse.data.id_token;
                }
            } catch(err){
                return undefined;
            }
        }
    }
    return token;
}

export async function setToken(token) {
    await AsyncStorage.setItem(TOKEN_KEY, token);
}

export async function removeToken() {
    await AsyncStorage.removeItem(TOKEN_KEY);
}

export async function getRefreshToken() {
    let token = await AsyncStorage.getItem(REFESH_TOKEN_KEY);
    return token;
}

export async function setRefreshToken(token) {
    await AsyncStorage.setItem(REFESH_TOKEN_KEY, token);
}

export async function removeRefreshToken() {
    await AsyncStorage.removeItem(REFESH_TOKEN_KEY);
}

export async function getAuth0Token() {
    let token = await AsyncStorage.getItem(AUTH0_ID_KEY);
    return token;
}

export async function setAuth0Token(token) {
    await AsyncStorage.setItem(AUTH0_ID_KEY, token);
}

export async function removeAuth0hToken() {
    await AsyncStorage.removeItem(AUTH0_ID_KEY);
}