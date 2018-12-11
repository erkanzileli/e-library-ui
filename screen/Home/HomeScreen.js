import React from 'react';
import { Container, Icon } from 'native-base';
import { ScrollView, RefreshControl, Alert } from "react-native";
import FloatingActionButton from '../../component/FloatingActionButton';
import { GET_BOOKS, REQUEST_USER } from '../../utils/gql';
import apolloClient from '../../utils/apolloClient';
import BookListItem from '../../component/Book/BookListItem';
import Loader from '../../component/Loader';
import { connect } from "react-redux";
import { setBooks, setLoading } from '../../redux/actions';

class HomeScreen extends React.Component {
  state = {
    refreshing: false
  }

  componentDidMount(props) {
    this.fetchData()
  }

  fetchData = async () => {
    this.props.setLoading(true)
    let { data: { books } } = await apolloClient.query({ query: GET_BOOKS, fetchPolicy: 'no-cache' })
    this.props.setBooks(books)
    this.props.setLoading(false)
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchData().then(response => this.setState({ refreshing: false }))
  }

  handleCreateBookPress = async () => {
    const { user } = this.props
    if (user.type === 'user') {
      // this.setState({loading: true})
      if (user.isRequested) {
        Alert.alert(
          'Kitap ekleme isteğiniz henüz onaylanmamıştır.',
          'Lütfen onaylanmasını bekleyiniz',
          [
            { text: 'Tamam' }
          ],
          { cancelable: true }
        )
      } else {
        Alert.alert(
          'Kitap ekleme yetkiniz bulunmamaktadır.',
          'Kitap ekleme isteğinde bulunmak istiyor musunuz?',
          [
            {
              text: 'Evet', onPress: () => {
                this.props.setLoading(true)
                this.handleRequest().then(response => {
                  Alert.alert(
                    'İşlem başarılı',
                    'Kitap yükleme isteğiniz Sistem Yöneticisine iletildi.',
                    [{ text: 'Tamam' }],
                    { cancelable: true }
                  )
                })
                this.props.setLoading(false)
              }
            },
            [{ text: 'Hayır' }]
          ],
          { cancelable: false }
        )
      }
    } else {
      this.props.navigation.navigate('CreateBook')
    }
  }

  handleRequest = () => apolloClient.mutate({ mutation: REQUEST_USER, variables: { username: user.username } })

  render() {
    const { navigation, allBooks, loading } = this.props
    const { refreshing } = this.state
    return (
      <Container style={{ backgroundColor: '#efefef' }}>
        <Loader loading={loading} />
        <FloatingActionButton
          onPress={() => this.handleCreateBookPress()}
          style={{ zIndex: 1, top: 475 }}
          icon={<Icon name='add' />}
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          {allBooks.map(book => (<BookListItem key={book.id} navigation={navigation} {...book} />))}
        </ScrollView>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  const { bookReducer: { allBooks }, userReducer: { user }, commonReducer: { loading } } = state
  return { allBooks, user, loading }
}

export default connect(mapStateToProps, { setBooks, setLoading })(HomeScreen)
