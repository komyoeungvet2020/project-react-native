import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text } from 'react-native'

export class Signup extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      email: '',
      password: '',
      confirm_password:'',
    };
  }
  
  onLogin() {
    const {email,password, confirm_password} = this.state;
    const [error, setError] = useState(null);
    // const {
    //   formState: { errors }
    // } = useForm();
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    // const errors = {}
    if (password == '') {
        Alert.alert('Password is required!');
    } else if(confirm_password !== password){
        Alert.alert('Your confirm password not match!');
    } else{
        Alert.alert('Register succeessful!'+'\n'+ email +'\n' + password );
    }
    if(reg.test(email) == ''){
      setError('Email is required!')
    }else if(reg.test(email) == false){
      setError('Email is incorrect format');
    }else if(reg.test(email) == true){
      setError('Email is correct format');
    }
    return error
  }

  render(error) {
    return (
      <View style={styles.container}>
        <Text>Register Form</Text>
        <TextInput
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
          placeholder={'E-Mail'}
          style={styles.input}
        />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />
        <TextInput
          value={this.state.confirm_password}
          onChangeText={(confirm_password) => this.setState({ confirm_password })}
          placeholder={'Confirm_Password'}
          secureTextEntry={true}
          style={styles.input}
        />
        
        <Button
          title={'Signup'}
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