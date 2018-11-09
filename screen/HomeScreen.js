import React from 'react';
import { View } from 'native-base';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {

  }
})

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home'
  }
  render() {
    return <View style={styles.container}>

    </View>
  }
}

export default HomeScreen
