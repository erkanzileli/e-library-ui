import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    FlatList
} from 'react-native';
import { Container } from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';

const BookListRow = ({ name, author, onPress }) => (
    <View>
        <Grid>
            <Col>
                <TouchableOpacity style={{ flex: 1 }} onPress={() => onPress()} >
                    <Text style={{ ...styles.rowText, color: "#008080" }}>
                        {name}
                    </Text>
                </TouchableOpacity>
            </Col>
            <Col>
                <Text style={styles.rowText}>
                    {`${author.firstName} ${author.lastName}`}
                </Text>
            </Col>
        </Grid>
    </View>)

export default function ({ books }) {
    return (
        <Container>
            <View style={styles.container}>
                <FlatList
                    style={styles.userList}
                    data={books}
                    renderItem={({ item }) => (
                        <BookListRow {...item} key={item.id} onPress={() => { }} />
                    )} />
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#eeeeee"
    },
    userList: {
        flex: 1,
    },
    rowText: {
        fontSize: 24,
        flex: 1,
        alignSelf: 'center',
        fontWeight: 'bold'
    }
});
