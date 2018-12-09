import React from 'react';
import { Container, Icon } from 'native-base';
import { FlatList, RefreshControl } from "react-native";
import FloatingActionButton from '../../component/FloatingActionButton';
import { GET_BOOKS } from '../../utils/gql';
import apolloClient from '../../utils/apolloClient';
import BookListItem from '../../component/Book/BookListItem';

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

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchData()
  }

  render() {
    const { navigation } = this.props
    const { books } = this.state
    if (navigation.state.params && navigation.state.params.bookId) {
      navigation.navigate({ routeName: 'BookDetail', params: { bookId: navigation.state.params.bookId } })
    }
    return (
      <Container style={{ backgroundColor: '#efefef' }}>
        <FloatingActionButton
          onPress={() => { navigation.navigate('CreateBook') }}
          style={{ zIndex: 1, top: 475 }}
          icon={<Icon name='add' />}
        />
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          data={books}
          renderItem={({ item }) => (<BookListItem navigation={navigation} {...item} />)}
          keyExtractor={(item, index) => item.id.toString()}
        />
      </Container>
    )

  }
}
export default HomeScreen
