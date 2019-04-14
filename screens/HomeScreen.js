// import React from 'react';
// import {
//   Image,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { WebBrowser } from 'expo';

// import { MonoText } from '../components/StyledText';

// export default class HomeScreen extends React.Component {
//   static navigationOptions = {
//     header: null,
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
//           <View style={styles.welcomeContainer}>
//             <Image
//               source={
//                 __DEV__
//                   ? require('../assets/images/robot-dev.png')
//                   : require('../assets/images/robot-prod.png')
//               }
//               style={styles.welcomeImage}
//             />
//           </View>

//           <View style={styles.getStartedContainer}>
//             {this._maybeRenderDevelopmentModeWarning()}

//             <Text style={styles.getStartedText}>Get started by opening</Text>

//             <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
//               <MonoText style={styles.codeHighlightText}>screens/HomeScreen.js</MonoText>
//             </View>

//             <Text style={styles.getStartedText}>
//               Teacup android
//             </Text>
//           </View>

//           <View style={styles.helpContainer}>
//             <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
//               <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>

//         <View style={styles.tabBarInfoContainer}>
//           <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

//           <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
//             <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
//           </View>
//         </View>
//       </View>
//     );
//   }

//   _maybeRenderDevelopmentModeWarning() {
//     if (__DEV__) {
//       const learnMoreButton = (
//         <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
//           Learn more
//         </Text>
//       );

//       return (
//         <Text style={styles.developmentModeText}>
//           Development mode is enabled, your app will be slower but you can use useful development
//           tools. {learnMoreButton}
//         </Text>
//       );
//     } else {
//       return (
//         <Text style={styles.developmentModeText}>
//           You are not in development mode, your app will run at full speed.
//         </Text>
//       );
//     }
//   }

//   _handleLearnMorePress = () => {
//     WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
//   };

//   _handleHelpPress = () => {
//     WebBrowser.openBrowserAsync(
//       'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
//     );
//   };
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   developmentModeText: {
//     marginBottom: 20,
//     color: 'rgba(0,0,0,0.4)',
//     fontSize: 14,
//     lineHeight: 19,
//     textAlign: 'center',
//   },
//   contentContainer: {
//     paddingTop: 30,
//   },
//   welcomeContainer: {
//     alignItems: 'center',
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   welcomeImage: {
//     width: 100,
//     height: 80,
//     resizeMode: 'contain',
//     marginTop: 3,
//     marginLeft: -10,
//   },
//   getStartedContainer: {
//     alignItems: 'center',
//     marginHorizontal: 50,
//   },
//   homeScreenFilename: {
//     marginVertical: 7,
//   },
//   codeHighlightText: {
//     color: 'rgba(96,100,109, 0.8)',
//   },
//   codeHighlightContainer: {
//     backgroundColor: 'rgba(0,0,0,0.05)',
//     borderRadius: 3,
//     paddingHorizontal: 4,
//   },
//   getStartedText: {
//     fontSize: 17,
//     color: 'rgba(96,100,109, 1)',
//     lineHeight: 24,
//     textAlign: 'center',
//   },
//   tabBarInfoContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     ...Platform.select({
//       ios: {
//         shadowColor: 'black',
//         shadowOffset: { height: -3 },
//         shadowOpacity: 0.1,
//         shadowRadius: 3,
//       },
//       android: {
//         elevation: 20,
//       },
//     }),
//     alignItems: 'center',
//     backgroundColor: '#fbfbfb',
//     paddingVertical: 20,
//   },
//   tabBarInfoText: {
//     fontSize: 17,
//     color: 'rgba(96,100,109, 1)',
//     textAlign: 'center',
//   },
//   navigationFilename: {
//     marginTop: 5,
//   },
//   helpContainer: {
//     marginTop: 15,
//     alignItems: 'center',
//   },
//   helpLink: {
//     paddingVertical: 15,
//   },
//   helpLinkText: {
//     fontSize: 14,
//     color: '#2e78b7',
//   },
// });








import React from 'react';
import firebase from 'firebase';
import LoginForm from '../Authentication/src/components/LoginForm';
import {Button, Header, Spinner} from "../Authentication/src/components/common";
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {LinearGradient} from 'expo';

class HomeScreen extends React.Component {
    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyCc1cFwMbW4WUX3pAeQcRfs8CtJrhCX5UY",
            authDomain: "teacup-prophecies-1b002.firebaseapp.com",
            databaseURL: "https://teacup-prophecies-1b002.firebaseio.com",
            projectId: "teacup-prophecies-1b002",
            storageBucket: "teacup-prophecies-1b002.appspot.com",
            messagingSenderId: "401025666665"
        });
        firebase
            .auth()
            .onAuthStateChanged((user) => {
                if (user) {
                    this.setState({loggedIn: true});
                } else {
                    this.setState({loggedIn: false});
                }
            });
    }
    static navigationOptions = {
        title: 'Login',
        headerStyle: {
            backgroundColor: 'rgba(121,198,121,0.4)'
        },
        headerTitleStyle: {
            textAlign: 'center',
            flexGrow: 1
        }
    }
    state = {
        loggedIn: null,
        textValue: 'Quote'
    };

    renderQuote() {
        
        firebase.database().ref('quotes/').once('value', (snapshot) => {
        var quotes = snapshot.val();
        const numOfQuotes = 385;
         var randQuote = quotes[Math.floor(Math.random() * numOfQuotes)];        
            console.log(randQuote);
            // this.setState({textValue: randQuote})
            this.setState.textValue = randQuote
        });
    };

    // newQuote(){
    //     let myQuote = quotes[Int(arc4random_uniform(UInt32(quotes.count) ))]
    //     quoteLabel.text =  myQuote.quote
    //     UIAccessibilityPostNotification(UIAccessibilityScreenChangedNotification, self.quoteLabel);
        
    // }
    renderContent() {
        
        switch (this.state.loggedIn) {
            case true:
                return (
                    <View
                        style={{
                            flexDirection: 'column',
                            display: 'flex',
                            height: 300
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignSelf: 'center'
                            }}>
                            <TextInput
                                // placeholder="Quotes"
                                multiline={true}
                                                            // onChangeText={ this.setState() }
                                style={{
                                    height: 350,
                                    marginTop: 120,
                                    alignSelf: 'center'
                                }}>{this.state.textValue}</TextInput>
                        </View>
                        <View
                            style={{
                                height: 50
                            }}>
                        <Button style={styles.roundButt} onPress={this.renderQuote()}> 
                            {/* //() => firebase.auth().signOut() */}
                                Prophecy
                            </Button>
                        </View>

                    </View>
                );
            case false:
                return <LoginForm/>;
            default:
                return (
                    <View
                        style={{
                            alignSelf: 'flex-end'
                        }}>
                        <Spinner size="large"/>
                    </View>
                );
        }

    }
    render() {
        return (
            <LinearGradient
                colors={['rgba(121,198,121,0.8)', '#8360c3', '#2ebf91']}
                style={{
                    // position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: 1000
                }}>
                <View>
                    <Text style={styles.homeText}>The Teacup Prophecies</Text>
                </View>
                <View style={styles.container}>
                    {this.renderContent()}
                </View>
            </LinearGradient>
        );
    }
}
const styles = StyleSheet.create({

    homeText: {
        fontSize: 20,
        marginTop: 15,
        color: '#000',
        alignSelf: 'center',
        // fontFamily: 'sans-serif'
    },
    roundButt: {
        marginTop: 5,
        height: 9,
        borderWidth: 1,
        borderRadius: 100
    }
});

export default HomeScreen;