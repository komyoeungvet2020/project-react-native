import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Signin } from './components/signin';
import { Signup } from './components/signup';

const App = () => {
  return(
    <ScrollView>
      {/* <Signin/> */}
      <Signup/>
    </ScrollView>
  );
};

export default App;