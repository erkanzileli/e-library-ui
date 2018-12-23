import React from 'react'
import { Container, Tabs, Tab } from 'native-base'
import UsersTab from './UsersTab';
import BookCategoriesTab from './BookCategoriesTab';
import AuthorsTab from './AuthorsTab';

function ManagementScreen(props) {
  return (<Container>
    <Tabs locked tabBarUnderlineStyle={{borderBottomWidth:0,height:0}}>
      <Tab heading="Kullanıcılar" tabStyle={{backgroundColor: '#fff'}} textStyle={{color: '#000'}} activeTabStyle={{backgroundColor: '#c5c5c5'}} activeTextStyle={{color: '#000', fontWeight: 'normal'}}>
        <UsersTab />
      </Tab>
      <Tab heading="Kategoriler" tabStyle={{backgroundColor: '#fff'}} textStyle={{color: '#000'}} activeTabStyle={{backgroundColor: '#c5c5c5'}} activeTextStyle={{color: '#000', fontWeight: 'normal'}}>
        <BookCategoriesTab />
      </Tab>
      <Tab heading="Yazarlar" tabStyle={{backgroundColor: '#fff'}} textStyle={{color: '#000'}} activeTabStyle={{backgroundColor: '#c5c5c5'}} activeTextStyle={{color: '#000', fontWeight: 'normal'}}>
        <AuthorsTab />
      </Tab>
    </Tabs>
  </Container>)
}




export default ManagementScreen
