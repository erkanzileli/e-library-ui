import React from 'react'
import { Text, Container, Content, SwipeRow, Button, Icon, Grid, Row, Col } from 'native-base'
import { TouchableOpacity } from 'react-native'
import Dropdown from '../component/Dropdown';

export default class ManagementScreen extends React.Component {
  render() {
    const userRoles = [
      { label: 'Yönetici', value: 'admin' },
      { label: 'Moderatör', value: 'moderator' },
      { label: 'Editör', value: 'editor' },
      { label: 'Kullanıcı', value: 'user' }
    ]
    const userRows = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        role: 'admin'
      },
      {
        id: 2,
        firstName: 'Azra',
        lastName: 'Kohen',
        role: 'editor'
      },
      {
        id: 3,
        firstName: 'Micheal',
        lastName: 'Tos',
        role: 'moderator'
      },
      {
        id: 4,
        firstName: 'Sam',
        lastName: 'Jackson',
        role: 'user',
        isRequested: true
      },
      {
        id: 5,
        firstName: 'Will',
        lastName: 'Hanks',
        role: 'user',
        isRequested: false
      }
    ].sort((a, b) => {
      let nameA = a.firstName.toUpperCase()
      let nameB = b.firstName.toUpperCase()
      if (nameA > nameB) {
        return 1
      }
      if (nameA < nameB) {
        return -1
      }
      return 0
    }).map(user =>
      (<SwipeRow key={user.id}
        rightOpenValue={-100}
        body={
          <Grid>
            <Row>
              <Col size={5}>
                <TouchableOpacity>
                  <Text style={styles.userCol}>
                    {`${user.firstName} ${user.lastName}`}
                  </Text>
                </TouchableOpacity>
              </Col>
              <Col siz={3} style={{ justifyContent: 'center' }}>
                {
                  user.role === 'user' ?
                    user.isRequested ?
                      <TouchableOpacity onPress={() => alert('Yükseltmek istiyor musunuz?')}>
                        <Icon type='FontAwesome' name="angle-double-up" />
                      </TouchableOpacity>
                      : undefined : undefined
                }
              </Col>
              <Col size={4}>
                <Dropdown options={userRoles} value={user.role} />
              </Col>
            </Row>
          </Grid>
        }
        right={
          <Button danger onPress={() => alert('Silmek istiyor musunuz?')}>
            <Icon active name="trash" />
          </Button>
        }
      />
      ))

    return <Container>
      <Content>
        <Grid>
          <Row>
            <Col size={7}>
              <Text style={{ paddingLeft: 15, paddingTop: 15, fontSize: 18 }}> Kullanıcı </Text>
            </Col>
            <Col size={4}>
              <Text style={{ paddingRight: 15, paddingTop: 15, fontSize: 18 }}> Yetkilendirme </Text>
            </Col>
          </Row>
        </Grid>
        {userRows}
      </Content>
    </Container>
  }
}
const styles = {
  userCol: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    alignSelf: 'flex-start',
    paddingLeft: 15,
    paddingTop: 15,
    color: "#008080"
  }
}