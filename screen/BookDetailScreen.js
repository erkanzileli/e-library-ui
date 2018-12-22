import React from 'react'
import { View, Text, Header, Left, Button, Icon, Body, Title, Right, Toast, Content, Card, CardItem, Grid, Row, Col, Container } from 'native-base';
import { TouchableOpacity, Alert } from 'react-native';
import StarRating from 'react-native-star-rating';
import RNFetchBlob from 'rn-fetch-blob'
import apolloClient from '../utils/apolloClient';
import { connect } from "react-redux";
import { GET_BOOK, DELETE_BOOK, GET_USER } from '../utils/gql';
import Loader from '../component/Loader';
import { getUserRole, getUserName } from '../utils/authorization';
import { getToken } from '../storage';
import { deleteBook, setBook } from "../redux/actions";
import { API_URL } from '../env/environment';

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
                        text: 'Sil', onPress: () => this.deleteBook(String(token).split(' ')[1])
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

    handleDownloadPress = async () => {
        const book = this.props.book
        Toast.show({
            text: "İndiriliyor!",
            duration: 3000
        })
        const token = await getToken()
        RNFetchBlob.config({
            addAndroidDownloads: {
                useDownloadManager: true, // <-- this is the only thing required
                // Optional, override notification setting (default to true)
                notification: true,
                // Optional, but recommended since android DownloadManager will fail when
                // the url does not contains a file extension, by default the mime type will be text/plain
                mime: 'application/pdf',
                description: 'Dosya indirme yöneticisi tarafından indirildi.'
            }
        }).fetch('GET', `${API_URL}/file/download/${book.filePath}`, {
            'Authorization': token,
        }).then((res) => {
            let status = res.info().status;
            if (status == 200) {
                // // the conversion is done in native code
                // let base64Str = res.base64()
                // // the following conversions are done in js, it's SYNC
                // let text = res.text()
                // let json = res.json()
                Toast.show({
                    text: `${book.name} adlı kitap ${res.path()} konumuna indirildi`,
                    duration: 3000,
                    type: 'success'
                })
            } else {
                // handle other status codes
            }
        })
    }

    render() {
        const { navigation } = this.props
        const { name, title, description, pageCount, downloadCount, likeCount, author, user, category } = this.props.book
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
                            duration: 3000
                        })}>
                        <Icon type='MaterialIcons' name='bookmark-border' />
                    </Button>
                    <Button transparent onPress={this.handleDownloadPress}>
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
                                                {author ? `${author.firstName} ${author.lastName}` : 'Yazar bilgisi yok.'}
                                            </Text>
                                            <Text style={styles.authorText}>
                                                {category ? category.name : 'Kategori bilgisi yok.'}
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
