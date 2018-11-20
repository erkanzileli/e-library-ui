import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';

export default class ProfileScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar2.png' }} />
                        <Text style={styles.name}>
                            Erkan ZİLELİ
                    </Text>
                    </View>
                </View>
                <View style={styles.profileDetail}>
                    <View style={styles.detailContent}>
                        <Text style={styles.title}>Photos</Text>
                        <Text style={styles.count}>200</Text>
                    </View>
                    <View style={styles.detailContent}>
                        <Text style={styles.title}>Followers</Text>
                        <Text style={styles.count}>200</Text>
                    </View>
                    <View style={styles.detailContent}>
                        <Text style={styles.title}>Following</Text>
                        <Text style={styles.count}>200</Text>
                    </View>
                </View>
                <View>
                    <View style={styles.bodyContent}>
                        <Grid>
                            <Row>
                                <Col>
                                    <Text>Book</Text>
                                </Col>
                                <Col>
                                    <Text>Book</Text>
                                </Col>
                                <Col>
                                    <Text>Book</Text>
                                </Col>
                                <Col>
                                    <Text>Book</Text>
                                </Col>
                            </Row>
                        </Grid>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#00CED1",
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
    profileDetail: {
        alignSelf: 'center',
        marginTop: 200,
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        backgroundColor: "#ffffff"
    },
    detailContent: {
        margin: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        color: "#00CED1"
    },
    count: {
        fontSize: 18,
    },
    bodyContent: {
        padding: 30,
        marginTop: 40
    },
    textInfo: {
        fontSize: 18,
        marginTop: 20,
        color: "#696969",
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#00CED1",
    },
    description: {
        fontSize: 20,
        color: "#00CED1",
        marginTop: 10,
        textAlign: 'center'
    },
});
