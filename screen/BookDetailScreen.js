import React from 'react'
import { View, Text, Header, Left, Button, Icon, Body, Title, Right, Toast, Content, Card, CardItem, Grid, Row, Col } from 'native-base';
import { TouchableOpacity } from 'react-native';
import StarRating from 'react-native-star-rating';

const styles = {
    authorText: {
        color: 'black'
    },
    downloadCountText: {
        fontSize: 16,
        color: 'black'
    }
}

export default class BookDetailScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header: <Header>
            <Left>
                <Button transparent onPress={() => navigation.goBack()}>
                    <Icon name='arrow-back' />
                </Button>
            </Left>
            <Body>
                <Title>{navigation.getParam('name')}</Title>
            </Body>
            <Right>
                <Button transparent onPress={() =>
                    Toast.show({
                        text: "Kaydedildi!",
                        buttonText: "Okay",
                        duration: 3000
                    })}>
                    <Icon type='MaterialIcons' name='bookmark-border' />
                </Button>
                <Button transparent onPress={() =>
                    Toast.show({
                        text: "İndiriliyor!",
                        buttonText: "Okay",
                        duration: 3000
                    })}>
                    <Icon name='download' />
                </Button>
            </Right>
        </Header>
    });

    render() {
        const { id, name, author, title, description, likeCount, downloadCount } = this.props.navigation.state.params
        return <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Content>
                    <Card>
                        <CardItem header bordered>
                            <Grid>
                                <Row>
                                    <Col size={5}>
                                        <Text style={styles.authorText}>
                                            {`${author.firstName} ${author.lastName}`}
                                        </Text>
                                    </Col>
                                    <Col size={3}>
                                        <StarRating
                                            disabled
                                            maxStars={5}
                                            starSize={20}
                                            rating={5 * parseFloat(likeCount / downloadCount)}
                                        />
                                    </Col>
                                </Row>
                            </Grid>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Text>
                                    {title}
                                </Text>
                            </Body>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Text>
                                    {description}
                                </Text>
                            </Body>
                        </CardItem>
                        <CardItem footer bordered>
                            <Grid>
                                <Row>
                                    <Col style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                        <Text style={styles.authorText}> Sayfa Sayısı 560 </Text>
                                    </Col>
                                    <Col style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <TouchableOpacity style={{ flexDirection: 'row' }}>
                                            <Icon type='FontAwesome' name='user' />
                                            <Text style={styles.authorText}>Tom Swiss</Text>
                                        </TouchableOpacity>
                                    </Col>
                                </Row>
                            </Grid>
                        </CardItem>
                    </Card>
                </Content>
            </View>
        </View >
    }
}