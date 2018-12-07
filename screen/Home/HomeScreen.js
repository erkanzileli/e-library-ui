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
        <BookList navigation={this.props.navigation} />
      </Container>
    )
  }
}

export default HomeScreen
