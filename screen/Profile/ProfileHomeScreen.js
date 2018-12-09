import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import { Container, Tabs, Tab, TabHeading, Icon } from 'native-base';
import DownloadedBooksTab from './Tabs/DownloadedBooks/DownloadedBooksTab';
import SavedBooksTab from './Tabs/SavedBooks/SavedBooksTab';
import FloatingActionButton from '../../component/FloatingActionButton';
import Loader from '../../component/Loader';
import apolloClient from '../../utils/apolloClient';
import { GET_USER } from '../../utils/gql';

export default class ProfileHomeScreen extends React.Component {
    state = {
        user: {
            firstName: null,
            lastName: null
        },
        loading: true,
        refreshed: false
    }

    async componentDidMount(props){
        this.fetchUser(2)
    }

    fetchUser = userId => {
        apolloClient.query({
            query: GET_USER,
            variables: { id: userId }
        }).then(response=> this.setState({user: response.data.user, loading: false}))
    }

    render(){
        const { navigation } = this.props
        const { user, loading,refreshed } = this.state
        if(navigation.state.params&&navigation.state.params.refresh&&!refreshed){
            this.setState({loading: true, refreshed: true})
            this.fetchUser(user.id)
        }
        return (
            <Container>
                <Loader loading={loading} />
                <FloatingActionButton onPress={() => navigation.navigate({routeName: 'ProfileEdit', params: {user: user}})} style={{ zIndex: 1 }} icon={<Icon name='settings' />} />
                <View style={{ justifyContent: 'center', alignContent: 'center', backgroundColor: '#66b7d6' }}>
                    <View style={styles.headerContent}>
                        <Image style={styles.avatar}
                            source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar1.png' }} />
                        <Text style={styles.name}>
                            {`${user.firstName} ${user.lastName}`}
                    </Text>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'space-evenly', alignContent: 'center' }}>
                        <Tabs style={{ flex: 1 }}>
                            <Tab style={{ flex: 1 }} heading={<TabHeading style={{ backgroundColor: '#5faac6' }} ><Icon name='download' /></TabHeading>}>
                                <DownloadedBooksTab />
                            </Tab>
                            <Tab style={{ flex: 1 }} heading={<TabHeading style={{ backgroundColor: '#5faac6' }} ><Icon type='MaterialIcons' name='bookmark' /></TabHeading>}>
                                <SavedBooksTab />
                            </Tab>
                        </Tabs>
                    </View>
                </View>
            </Container>
        );
    
    }
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: "#1E90FF",
    },
    headerContent: {
        padding: 30,
        alignItems: 'center',
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
    },
    name: {
        fontSize: 22,
        color: "#FFFFFF",
        fontWeight: '600',
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    textInfo: {
        fontSize: 18,
        marginTop: 20,
        color: "#696969",
    }
});
