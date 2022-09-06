import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text} from 'react-native'

export class Signin extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      email: '',
      password: '123',
    };
  }
  
  onLogin() {
    const { email, password } = this.state;
    if(password == 123){
      Alert.alert('Your Email and password is: ' ,` ${email} \n ${password}`)
    }else if (password != 123 && email == null){
      Alert.alert('Your email or password incorrect');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Login Form</Text>
        <TextInput
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
          placeholder={'Email'}
          style={styles.input}
        />
        
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />
        <Button
          title={'Login'}
          style={styles.input}
          onPress={this.onLogin.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 250,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius:10,
    marginBottom: 10,
    marginTop:10,
  },
});