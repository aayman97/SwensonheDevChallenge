import React from 'react';
import {StyleSheet} from 'react-native';
import MainStackNavigator from './src/navigation/StackNavigation';
import {Provider} from 'react-redux';
import store from './src/store/configureStore';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <MainStackNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({});

export default App;
