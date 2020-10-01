import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
//import HTML_FILE from 'Web.bundle/loader.html';

const filesource = Platform.OS === 'android'
    ? { uri: 'file:///android_asset/index.html'}
    : { uri: 'Web.bundle/index.html'};

const topMargin = Platform.OS === 'android' ? 0 : 45;

export default class Website extends Component {
    render() {
        return (
            <WebView
                style={{ marginTop: topMargin }}
                originWhitelist={['file://*', 'http://*', 'https://*']}
                source={filesource}
                onLoadProgress={e => console.log(e.nativeEvent.progress)}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                onMessage={event => {
                    const { data } = event.nativeEvent;
                    if(data=='login')
                    {
                        this.props.navigation.navigate('Login');
                    }
                }}
            />
        );
    }
}
