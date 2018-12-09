import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    KeyboardAvoidingView
} from 'react-native';
import { Container, Tabs, Tab, TabHeading, Icon } from 'native-base';
import DownloadedBooksTab from './Tabs/DownloadedBooks/DownloadedBooksTab';
import SavedBooksTab from './Tabs/SavedBooks/SavedBooksTab';
import FloatingActionButton from '../../component/FloatingActionButton';

export default class ProfileHomeScreen extends React.Component {
    state = {
        updateScreenActive: false
    }
    render() {
        const { updateScreenActive } = this.state
        return (
            <Container style={{ flex: 1 }}>
                <FloatingActionButton onPress={() => this.props.navigation.navigate('ProfileEdit')} style={{ zIndex: 1 }} icon={<Icon name='settings' />} />
                <View style={{ justifyContent: 'center', alignContent: 'center', backgroundColor: '#66b7d6' }}>
                    <View style={styles.headerContent}>
                        <Image style={styles.avatar}
                            source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar1.png' }} />
                        <Text style={styles.name}>
                            John Doe
                    </Text>
                    </View>
                </View>
                <View>
                    <View style={{ flex: 0, justifyContent: 'space-evenly', alignContent: 'center' }}>
                        <Tabs style={{ flex: 0 }}>
                            <Tab heading={<TabHeading style={{ flex: 1, backgroundColor: '#5faac6' }} ><Icon name='download' /></TabHeading>}>
                                <DownloadedBooksTab />
                            </Tab>
                            <Tab heading={<TabHeading style={{ flex: 1, backgroundColor: '#5faac6' }} ><Icon type='MaterialIcons' name='bookmark' /></TabHeading>}>
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
