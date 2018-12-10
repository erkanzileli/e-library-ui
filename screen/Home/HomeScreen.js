import React from 'react';
import { Container, Icon } from 'native-base';
import { ScrollView, RefreshControl, Alert } from "react-native";
import FloatingActionButton from '../../component/FloatingActionButton';
import { GET_BOOKS, GET_USER, REQUEST_USER } from '../../utils/gql';
import apolloClient from '../../utils/apolloClient';
import BookListItem from '../../component/Book/BookListItem';
import { getUserName } from '../../utils/authorization';

class HomeScreen extends React.Component {
  state = {
    books: [],
    refreshing: false
  }

  componentDidMount(props) {
    this.fetchData()
  }

  fetchData = async () => {
    let { data: { books } } = await apolloClient.query({ query: GET_BOOKS, fetchPolicy: 'no-cache' })
    this.setState({ books, refreshing: false })
  }

  fetchUser = async () =>
    apolloClient.query({
      query: GET_USER,
      variables: { username: await getUserName() },
      fetchPolicy:  'no-cache'
    }).then(response => (response.data.user))

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchData()
  }

  handleCreateBookPress = async () => {
    const user = await this.fetchUser()
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
                apolloClient.mutate({
                  mutation: REQUEST_USER,
                  variables: { username: user.username }
                }).then(response => {
                  Alert.alert(
                    'İşlem başarılı',
                    'Kitap yükleme isteğiniz Sistem Yöneticisine iletildi.',
                    [
                      { text: 'Tamam' }
                    ],
                    { cancelable: true }
                  )
                  this.setState({ loading: false })
                })
              }
            },
            { text: 'Hayır' }
          ],
          { cancelable: false }
        )
      }
    } else {
      this.props.navigation.navigate('CreateBook')
    }
  }

  handleRequest = () => {

  }

  render() {
    const { navigation } = this.props
    const { books } = this.state
    return (
      <Container style={{ backgroundColor: '#efefef' }}>
        <FloatingActionButton
          onPress={() => this.handleCreateBookPress()}
          style={{ zIndex: 1, top: 475 }}
          icon={<Icon name='add' />}
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          {books.map(book => (<BookListItem navigation={navigation} {...book} />))}
        </ScrollView>
      </Container>
    )
  }
}
export default HomeScreen
