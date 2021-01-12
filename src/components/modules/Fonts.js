import { Platform } from 'react-native';
export const fonts = {
    InterExtraBold : 'Inter-ExtraBold' ,
    GraphikSemibold : Platform.OS === 'android' ? 'GraphikSemibold' : 'Graphik-Semibold',
    GraphikBold : Platform.OS === 'android' ? 'GraphikBold' : 'Graphik-Bold',
    GraphikRegular : Platform.OS === 'android' ? 'GraphikRegular' : 'Graphik-Regular',
}