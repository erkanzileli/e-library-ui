import React from 'react'
import {
    Alert,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import { Container, Tabs, Tab, TabHeading, Icon, Button } from 'native-base';
import { connect } from "react-redux";
import DownloadedBooksTab from './Tabs/DownloadedBooks/DownloadedBooksTab';
import SavedBooksTab from './Tabs/SavedBooks/SavedBooksTab';
import FloatingActionButton from '../../component/FloatingActionButton';
import Loader from '../../component/Loader';
import { clearStorage } from '../../storage';
import apolloClient from '../../utils/apolloClient';
import { GET_USER } from '../../utils/gql';
import { getUserName } from '../../utils/authorization';

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
class ProfileHomeScreen extends React.Component {
    handleLogoutButtonPress = () => {
        Alert.alert(
            'Uyarı',
            'Çıkış yapmak istiyor musunuz?',
            [
                {
                    text: 'Evet', onPress: () => {
                        clearStorage()
                        this.props.navigation.navigate('Login')
                    }
                },
                { text: 'Hayır' }
            ],
            { cancelable: true }
        )
    }

    render() {
        const { user, loading, navigation } = this.props
        return (
            <Container>
                <Loader loading={loading} />
                <FloatingActionButton
                    onPress={() => navigation.navigate('ProfileEdit')}
                    style={{ zIndex: 1 }}
                    icon={<Icon name='settings' />}
                />
                <View
                    style={{
                        justifyContent: 'center',
                        alignContent: 'center',
                        backgroundColor: '#66b7d6'
                    }}>
                    <Button
                        style={{
                            backgroundColor: '#66b7d6'
                        }}
                        onPress={this.handleLogoutButtonPress}
                    >
                        <Text style={{ ...styles.name, fontSize: 12 }}>
                            Çıkış Yap
                        </Text>
                    </Button>
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
                            <Tab style={{ flex: 1 }}
                                heading={<TabHeading style={{ backgroundColor: '#5faac6' }}
                                ><Icon name='download' /></TabHeading>}
                            >
                                <DownloadedBooksTab />
                            </Tab>
                            <Tab style={{ flex: 1 }}
                                heading={<TabHeading
                                    style={{ backgroundColor: '#5faac6' }}>
                                    <Icon type='MaterialIcons' name='bookmark' />
                                </TabHeading>}
                            >
                                <SavedBooksTab />
                            </Tab>
                        </Tabs>
                    </View>
                </View>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    const { userReducer: { user }, commonReducer: { loading } } = state
    return { user, loading }
}

export default connect(mapStateToProps)(ProfileHomeScreen)

