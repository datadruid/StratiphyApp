import AsyncStorage from '@react-native-community/async-storage';

const FULL_NAME_KEY = 'fullnamekey'

export async function getName() {
    const token = await AsyncStorage.getItem(FULL_NAME_KEY);
    return token;
}

export async function setName(name) {
    await AsyncStorage.setItem(FULL_NAME_KEY, name);
}

export async function removeName() {
    await AsyncStorage.removeItem(FULL_NAME_KEY);
}