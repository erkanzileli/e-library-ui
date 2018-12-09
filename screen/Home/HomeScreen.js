import React from 'react';
import { Container, Icon } from 'native-base';
import { FlatList } from "react-native";
import FloatingActionButton from '../../component/FloatingActionButton';
import { GET_BOOKS } from '../../utils/gql';
import apolloClient from '../../utils/apolloClient';
import BookListItem from '../../component/Book/BookListItem';

class HomeScreen extends React.Component {
  state = {
    books: []
  }

  constructor(props) {
    super(props)
    console.warn(props)
  }

  async componentDidMount(props) {
    let { data: { books } } = await apolloClient.query({ query: GET_BOOKS, fetchPolicy: 'no-cache' })
    this.setState({ books })
  }

  render() {
    const { navigation } = this.props
    const { books } = this.state
    if (navigation.state.params && navigation.state.params.bookId) {
      navigation.navigate({ routeName: 'BookDetail', params: { ...navigation.params } })
    }
    return (
      <Container style={{ backgroundColor: '#efefef' }}>
        <FloatingActionButton
          onPress={() => { navigation.navigate('CreateBook') }}
          style={{ zIndex: 1, top: 475 }}
          icon={<Icon name='add' />}
        />
        <FlatList
          data={books}
          renderItem={({ item }) => (<BookListItem navigation={navigation} {...item} />)}
          keyExtractor={(item, index) => item.id.toString()}
        />
      </Container>
    )

  }
}
export default HomeScreen
