import React from 'react'
import { View, Text, Header, Left, Button, Icon, Body, Title, Right, Toast, Content, Card, CardItem, Grid, Row, Col, Container } from 'native-base';
import { TouchableOpacity, Alert } from 'react-native';
import StarRating from 'react-native-star-rating';
import apolloClient from '../utils/apolloClient';
import { connect } from "react-redux";
import { GET_BOOK, DELETE_BOOK, GET_USER } from '../utils/gql';
import Loader from '../component/Loader';
import { getUserRole, getUserName } from '../utils/authorization';
import { getToken } from '../storage';
import { deleteBook, setBook } from "../redux/actions";

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
        loading: true
    }

    constructor(props) {
        super(props)
        const bookId = props.navigation.getParam('bookId')
        this.getBook(bookId)
    }

    getBook = async bookId => {
        const { data: { book } } = await apolloClient.query({ query: GET_BOOK, variables: { id: bookId }, fetchPolicy: 'no-cache' })
        this.props.setBook(book)
        this.setState({ loading: false })
    }

    deleteBook = (token, { id } = this.props.book) => {
        this.setState({ loading: true })
        apolloClient.mutate({
            mutation: DELETE_BOOK,
            variables: { id, token }
        }).then(response => {
            this.props.deleteBook(id)
            this.setState({ loading: false })
            Toast.show({
                text: "Silindi!",
                buttonText: "Okay",
                duration: 3000
            })
            this.props.navigation.navigate('Home')
        })
    }

    handleDelete = async () => {
        const role = await getUserRole()
        const username = await getUserName()
        if ((role === 'admin') || username === this.props.book.user.username) {
            const token = await getToken()
            Alert.alert(
                'Kitap silinecek!',
                'Bu kitabı silmek istiyor musunuz?',
                [
                    {
                        text: 'Sil', onPress: () => this.deleteBook(token)
                    },
                    {
                        text: 'İptal'
                    }
                ],
                {
                    cancelable: true
                }
            )
        } else {
            Alert.alert(
                'Bu kitabı silmeye yetkiniz yok!', '', [],
                {
                    cancelable: true
                }
            )
        }
    }

    updateBook = (username) => {

    }

    handleUpdateBook = ({ book, user, navigation } = this.props) => {
        if ((book.user.username === user.username) || user.username === 'moderator') {
            navigation.navigate('BookEdit', { book })
        } else {
            Alert.alert(
                'Bu kitabı düzenleme yetkiniz yok!', '', [],
                { cancelable: true }
            )
        }
    }

    render() {
        const { navigation } = this.props
        const { name, title, description, pageCount, downloadCount, likeCount, author, user } = this.props.book
        return <Container>
            <Loader loading={this.state.loading} />
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
                    <Button transparent onPress={() => this.handleDelete()}>
                        <Icon name='trash' />
                    </Button>
                    <Button transparent onPress={() => this.handleUpdateBook()}>
                        <Icon type='MaterialIcons' name='edit' />
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

const mapStateToProps = state => {
    const { bookReducer: { book }, userReducer: { user } } = state
    return { book, user }
}

export default connect(mapStateToProps, { deleteBook, setBook })(BookDetailScreen)
