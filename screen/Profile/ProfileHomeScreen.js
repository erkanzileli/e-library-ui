import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import { Container, Header, Tabs, Tab, TabHeading, Icon, ScrollableTab } from 'native-base';

export default class ProfileScreen extends React.Component {
    render() {
        return (
            <Container style={styles.container}>
                <View style={{ justifyContent: 'center', alignContent: 'center', backgroundColor: '#66b7d6' }}>
                    <View style={styles.headerContent}>
                        <Image style={styles.avatar}
                            source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar1.png' }} />

                        <Text style={styles.name}>
                            Erkan ZİLELİ
                    </Text>
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'space-evenly', alignContent: 'center' }}>
                    <Tabs>
                        <Tab heading={<TabHeading style={{ backgroundColor: '#5faac6' }} ><Icon name='download' /></TabHeading>}>
                            {/* <Tab2 /> */}
                        </Tab>
                        <Tab heading={<TabHeading style={{ backgroundColor: '#5faac6' }} ><Icon type='MaterialIcons' name='bookmark' /></TabHeading>}>
                            {/* <Tab2 /> */}
                        </Tab>
                    </Tabs>
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
