import React from 'react'
import { View, Text, Header, Left, Button, Icon, Body, Title, Right, Toast, Content, Card, CardItem, Grid, Row, Col, Container } from 'native-base';
import { TouchableOpacity } from 'react-native';
import StarRating from 'react-native-star-rating';
import apolloClient from '../utils/apolloClient';
import { GET_BOOK } from '../utils/gql';

const styles = {
    authorText: {
        color: 'black'
    },
    downloadCountText: {
        fontSize: 16,
        color: 'black'
    }
}

class BookDetailScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header: <></>
    });

    state = {
        book: {
            name: null,
            title: null,
            description: null,
            pageCount: null,
            downloadCount: 0,
            likeCount: 0,
            author: {
                firstName: null,
                lastName: null
            },
            user: {
                firstName: null,
                lastName: null
            },
        }
    }

    async componentDidMount(props) {
        console.warn(props)
        const { bookId } = props.id
        let { data: { book } } = await apolloClient.query({ query: GET_BOOK, variables: { id: bookId } })
        this.setState({ book })
    }
    
    render() {
        const { navigation } = this.props
        const { name, title, description, pageCount, downloadCount, likeCount, author, category, user } = this.state.book
        return <Container>
            <Header>
                <Left>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title>{name}</Title>
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
            <View style={{ flex: 1 }}>
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
                                            <Text style={styles.authorText}> Sayfa Sayısı {pageCount} </Text>
                                        </Col>
                                        <Col style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                            <TouchableOpacity style={{ flexDirection: 'row' }}>
                                                <Icon type='FontAwesome' name='user' />
                                                <Text style={styles.authorText}>
                                                    {`${user.firstName} ${user.lastName}`}
                                                </Text>
                                            </TouchableOpacity>
                                        </Col>
                                    </Row>
                                </Grid>
                            </CardItem>
                        </Card>
                    </Content>
                </View>
            </View >
        </Container>
    }
}

export default BookDetailScreen