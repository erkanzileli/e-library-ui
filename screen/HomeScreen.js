import React from 'react'
import { View, Text, Button, Icon } from 'native-base'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home'
  }

  renderHamburger = ({ openDrawer } = this.props.navigation) =>
    <Button onPress={() => openDrawer()}>
      <Icon name='menu' />
    </Button>

  render() {
    return <View>
      <Text onPress={()=>this.props.navigation.navigate('Demo')}>
        Home
        </Text>
    </View>
  }
}
