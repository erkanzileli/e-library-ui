import React from 'react'
import { View, Text } from 'native-base'
export default class LoggedScreen extends React.Component {
  static navigationOptions = {
    title: 'Logged'
  }

  render () {
    return <View>
        <Text>
          Logged
        </Text>
    </View>
  }
}
