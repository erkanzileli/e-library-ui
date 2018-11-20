import React from 'react';
import BookList from '../../component/Book/BookList';
import { View, Container } from 'native-base';

class HomeScreen extends React.Component {
  state = {
    messages: [],
  }

  render() {
    return (
      <Container style={{backgroundColor: '#efefef'}}>
        <BookList />
      </Container>
    )
  }
}

export default HomeScreen
