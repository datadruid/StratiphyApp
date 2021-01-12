import AsyncStorage from '@react-native-community/async-storage';

const FIRST_NAME_KEY = 'firstnamekey';
const LAST_NAME_KEY = 'lasttnamekey';
const EMAIL_KEY = 'emailkey';
const INTRO_SHOWN = 'introshownkey';

export async function getLastName() {
    const token = await AsyncStorage.getItem(LAST_NAME_KEY);
    return token;
}

export async function setLastName(name) {
    await AsyncStorage.setItem(LAST_NAME_KEY, name);
}

export async function removeLastName() {
    await AsyncStorage.removeItem(LAST_NAME_KEY);
}

export async function getFirstName() {
    const token = await AsyncStorage.getItem(FIRST_NAME_KEY);
    return token;
}

export async function setFirstName(name) {
    await AsyncStorage.setItem(FIRST_NAME_KEY, name);
}

export async function removeFirstName() {
    await AsyncStorage.removeItem(FIRST_NAME_KEY);
}

export async function getEmail() {
    const email = await AsyncStorage.getItem(EMAIL_KEY);
    return email;
}

export async function setEmail(email) {
    await AsyncStorage.setItem(EMAIL_KEY, email);
}

export async function removeEmail() {
    await AsyncStorage.removeItem(EMAIL_KEY);
}

export async function getIntroShown() {
    const shown = await AsyncStorage.getItem(INTRO_SHOWN);
    const test = (shown == 'true');
    return test;
}

export async function setIntroShown(shown) {
    await AsyncStorage.setItem(INTRO_SHOWN, shown);
}

export async function removeIntroShown() {
    await AsyncStorage.removeItem(INTRO_SHOWN);
}