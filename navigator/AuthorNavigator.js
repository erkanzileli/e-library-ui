import { createStackNavigator } from 'react-navigation'
import AuthorListScreen from "../screen/Author/AuthorListScreen";

export default createStackNavigator(
    {
        Authors: {
            screen: AuthorListScreen
        }
    },
    {
        initialRouteName: 'Authors'
    }
)
