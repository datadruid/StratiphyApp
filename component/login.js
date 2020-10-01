import React from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Stitch, UserPasswordCredential, FacebookCredential, GoogleCredential } from 'mongodb-stitch-react-native-sdk';
import { FacebookSocialButton, GoogleSocialButton } from "react-native-social-buttons";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            currentUserId: undefined,
            client: undefined,
            email: undefined,
            password: undefined,
        };

        this._loadClient = this._loadClient.bind(this);
        this._onPressLogin = this._onPressLogin.bind(this);
        this._onPressLogout = this._onPressLogout.bind(this);
        this._onPressFacebookLogin = this._onPressFacebookLogin.bind(this);
        this._onPressGoogleLogin = this._onPressGoogleLogin.bind(this);
    }

    componentDidMount() {
        this._loadClient();
    }

    render() {
        let loginStatus = 'Currently logged out.'
        let userId = ''
        let email = ''

        if(this.state.currentUserId) {
            loginStatus = `Currently logged in`
            userId  = this.state.currentUserId;
            email = this.state.email;
        }

        var loginButton = <Button style={styles.button}
            onPress={this._onPressLogin}
            title="Login"/>

        var logoutButton = <Button style={styles.button}
            onPress={this._onPressLogout}
            title="Logout"/>

        return (
            <View style={styles.container}>
                {!this.state.currentUserId &&
                    <View style={styles.socialcontainer} >
                        <View style={styles.socialbutton}>
                            <FacebookSocialButton onPress={this._onPressFacebookLogin} />
                        </View>
                        <View style={styles.socialbutton}>
                            <GoogleSocialButton onPress={this._onPressGoogleLogin} />
                        </View>
                    </View>
                }
                {!this.state.currentUserId &&
                    <View style={styles.socialbutton}>
                        <Text>-- or --</Text>
                    </View>
                }
                {!this.state.currentUserId &&
                <View style={styles.rowcontainer}>
                    <Text style={styles.inputlabel}> Email Addess: </Text>
                    <TextInput
                        value={this.state.email}
                        style={styles.inputs}
                        autoCapitalize="none"
                        placeholder='example@domain.com'
                        placeholderTextColor="#d3d3d3"
                        onChangeText={text => this.setState({email: text})}/>
                </View>
                }
                {!this.state.currentUserId &&
                <View style={styles.rowcontainer}>
                    <Text style={styles.inputlabel}> Password: </Text>
                    <TextInput
                        value={this.state.password}
                        secureTextEntry={true}
                        style={styles.inputs}
                        onChangeText={text => this.setState({password: text})}/>
                </View>
                }
                <Text> {loginStatus} </Text>
                <Text> {userId} </Text>
                <Text> {email} </Text>
                {this.state.currentUserId !== undefined ? logoutButton : loginButton}
            </View>
        );
    }

    _loadClient() {
        const appId = 'testapplication-zhxbq';
        if(Stitch.hasAppClient(appId))
        {
            let client = Stitch.getAppClient(appId);
            this.setState({client});

            if (client.auth.isLoggedIn) {
                this.setState({currentUserId: client.auth.user.id})
            }
        }
        else
        {
            Stitch.initializeDefaultAppClient(appId).then(client => {
                this.setState({client});

                if (client.auth.isLoggedIn) {
                    this.setState({currentUserId: client.auth.user.id})
                }
            });
        }
    }

    _onPressLogin() {
        const stitchClient = Stitch.defaultAppClient;
        if(this.state.email !== undefined && this.state.email.length > 0 && this.state.password !== undefined && this.state.password.length > 0 ) {
            let credential = new UserPasswordCredential(this.state.email, this.state.password);
            stitchClient.auth.loginWithCredential(credential).then(user => {
                //alert(`Successfully logged in as user ${user.id}`);s
                this.setState({currentUserId: user.id});
                this.setState({email: stitchClient.auth.user.profile.email});
            }).catch(err => {
                alert(`${err}`);
                this.setState({currentUserId: undefined});
            });
        }
    }

    _onPressFacebookLogin() {
        alert(`Not available yet`);
        // const stitchClient = Stitch.defaultAppClient;
        // let credential = new FacebookCredential();
        // stitchClient.auth.loginWithCredential(credential).then(user => {
        //     //alert(`Successfully logged in as user ${user.id}`);
        //     this.setState({currentUserId: user.id})
        // }).catch(err => {
        //     alert(`${err}`);
        //     this.setState({currentUserId: undefined})
        // });
    }

    _onPressGoogleLogin() {
        alert(`Not available yet`);
        // const stitchClient = Stitch.defaultAppClient;
        // let credential = new GoogleCredential();
        // stitchClient.auth.loginWithCredential(credential).then(user => {
        //     //alert(`Successfully logged in as user ${user.id}`);
        //     this.setState({currentUserId: user.id})
        // }).catch(err => {
        //     alert(`Failed to log in anonymously: ${err}`);
        //     this.setState({currentUserId: undefined})
        // });
    }

    _onPressLogout() {
        this.state.client.auth.logout().then(user => {
            //alert(`Successfully logged out`);
            this.setState({ currentUserId: undefined })
        }).catch(err => {
            alert(`Failed to log out: ${err}`);
            this.setState({ currentUserId: undefined })
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowcontainer: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width:'70%',
        paddingBottom:20,
    },
    socialcontainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width:'70%',
        paddingBottom:20,
    },
    socialbutton: {
        paddingBottom:20,
    },
    button: {
        backgroundColor: '#353638',
        width:'200px',
        height:'56px',
    },
    inputlabel: {
        width:'100%',
        alignItems: 'flex-start',
    },
    inputs: {
        width:'100%',
        alignItems: 'flex-start',
        borderBottomColor: '#3b3b3b',
        borderBottomWidth: 1,
    },
});
