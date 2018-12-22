import React from 'react'
import { Container, Tabs, Tab } from 'native-base'
import UsersTab from './UsersTab';
import BookCategoriesTab from './BookCategoriesTab';
import AuthorsTab from './AuthorsTab';

function ManagementScreen(props) {
  return (<Container>
    <Tabs locked>
      <Tab heading="Kullanıcılar">
        <UsersTab />
      </Tab>
      <Tab heading="Kategoriler">
        <BookCategoriesTab />
      </Tab>
      <Tab heading="Yazarlar">
        <AuthorsTab />
      </Tab>
    </Tabs>
  </Container>)
}

export default ManagementScreen
