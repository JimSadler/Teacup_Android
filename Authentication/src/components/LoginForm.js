import React, {Component} from 'react';
import firebase from 'firebase';
import {Text, View} from 'react-native';
import {Button, Card, CardSection, Input, Spinner} from './common';
class LoginForm extends Component {
    state = {
        email: '',
        password: '',
        error: '',
        loading: false
    };
    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if(user != null) {
                console.log(user);
            }
        })
    }
    onButtonPress() {
        const {email, password} = this.state;
        this.setState({error: "", loading: true});

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(() => {
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch(this.onLoginFail.bind(this));
            });
    }
    onLoginFail() {
        this.setState({error: "Authentication Failed.", loading: false});
    }
    onLoginSuccess() {
        this.setState({email: '', password: '', loading: false, error: ''});
    }
    renderButton() {
        if (this.state.loading) {
            return <Spinner size='small'/>
        }
        return (
            <Button
                style={{ flexDirection: 'row'}}
                onPress={this
                    .onButtonPress
                    .bind(this)}>
                Log in/ Sign Up
            </Button>
            
        );
    }
    renderFBButton() {
        if (this.state.loading) {
            return <Spinner size='small'/>
        }
        return (
            <Button
                onPress={() => this.loginWithFacebook()}>
                    Login with Facebook
            </Button>
            
        );
    }

    async loginWithFacebook() {
        const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync('1312596802182794', { permissions: ['public_profile'] })
        if (type == 'success') {
            const credential = firebase.auth.FacebookAuthProvider.credential(token)
            firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error) => {
                console.log(error)
            })
        }
    }
    render() {
        return (
            <Card style={styles.cardMargin}>
                <CardSection>
                    <Input
                        style={{
                            height: 20,
                            width: 100
                        }}
                        placeholder="user@gmail.com"
                        label="Email"
                        value={this.state.email}
                        onChangeText={email => this.setState({email})}/>
                </CardSection>
                <CardSection>
                    <Input
                        style={{
                            height: 20,
                            width: 100
                        }}
                        secureTextEntry={true}
                        placeholder="password"
                        label="Password"
                        value={this.state.password}
                        onChangeText={password => this.setState({password})}/>
                </CardSection>
                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>
                <CardSection
                    style={{
                        borderBottomWidth: 0
                    }}>
                    {this.renderButton()}
                </CardSection>
                <CardSection
                    style={{
                        borderBottomWidth: 0
                    }}>
                    {this.renderFBButton()}
                </CardSection>
                

            </Card>
        );
    }
}
const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    cardMargin: {
        marginTop: 40
    }
}
export default LoginForm; 