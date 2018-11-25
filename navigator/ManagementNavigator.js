import { createStackNavigator } from 'react-navigation'
import ManagementScreen from '../screen/ManagementScreen'

export default createStackNavigator(
  {
    Management: {
      screen: ManagementScreen,
      navigationOptions: () => ({
          title: 'Yönetim'
      })
    }
  },
  {
    initialRouteName: 'Management'
  }
)
