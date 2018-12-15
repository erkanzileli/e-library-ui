import React from 'react'
import { Text, Container, Content, Toast, SwipeRow, Button, Icon, Grid, Row, Col } from 'native-base'
import { Alert, RefreshControl, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from "react-redux";
import Dropdown from '../component/Dropdown';
import { setUsers } from "../redux/actions";
import apolloClient from '../utils/apolloClient';
import { GET_USERS, USER_TO_EDITOR, CHANGE_USER_TYPE, IGNORE_USER } from '../utils/gql';
import Loader from '../component/Loader';
import { getUserName } from '../utils/authorization';

const userRoleOptions = [
  { label: 'Yönetici', value: 'admin' },
  { label: 'Moderatör', value: 'moderator' },
  { label: 'Editör', value: 'editor' },
  { label: 'Kullanıcı', value: 'user' }
]


class ManagementScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      refreshing: false
    }
    this.fetchUsers()
  }

  fetchUsers = async () => {
    let { data: { users } } = await apolloClient.query({ query: GET_USERS, fetchPolicy: 'network-only' })
    const username = await getUserName()
    users = users.filter(user => user.username !== username)
    this.props.setUsers(users)
    this.setState({ loading: false })
  }

  upgradeUser = id => {
    this.setState({ loading: true })
    apolloClient.mutate({
      mutation: USER_TO_EDITOR,
      variables: { id }
    }).then(response => {
      const { data: { userToEditor } } = response
      let users = this.props.users
      users[users.findIndex(user => user.id === id)] = userToEditor
      this.props.setUsers(users)
      Toast.show({
        text: "Kullanıcı yükseltild!",
        buttonText: "Tamam",
        duration: 3000
      })
      this.setState({ loading: false })
    })
  }

  changeUserType = (id, type) => {
    this.setState({ loading: true })
    apolloClient.mutate({
      mutation: CHANGE_USER_TYPE,
      variables: { id, type }
    }).then(response => {
      const { data: { changeUserType } } = response
      let users = this.props.users
      users[users.findIndex(user => user.id === id)] = changeUserType
      this.props.setUsers(users)
      Toast.show({
        text: "Kullanıcı yetkisi değiştirildi!",
        buttonText: "Tamam",
        duration: 3000
      })
      this.setState({ loading: false })
    })
  }

  ignoreUser = async username => {
    this.setState({ loading: true })
    apolloClient.mutate({
      mutation: IGNORE_USER,
      variables: { username }
    }).then(response => {
      const { data: { ignoreUser } } = response
      let users = this.props.users
      users[users.findIndex(user => user.username === username)] = ignoreUser
      Toast.show({
        text: "Kullanıcı engellendi!",
        buttonText: "Tamam",
        duration: 3000
      })
      this.setState({ loading: false })
    })
  }

  handleChangeUserType = (id, type) => {
    Alert.alert(
      'Bu kullanıcının yetkisini değiştirmek istediğinize emin misiniz?', '',
      [
        {
          text: 'Evet', onPress: () => this.changeUserType(id, type)
        },
        {
          text: 'İptal'
        }
      ],
      { cancelable: true }
    )
  }

  handleRequestedUserUpgrade = user => {
    Alert.alert(
      'Bu kullanıcı kitap yüklemek istiyor.',
      'Kitap yüklemesi için Editör seviyesine yükselmesini istiyor musunuz?',
      [
        {
          text: 'Evet', onPress: () => this.upgradeUser(user.id)
        },
        {
          text: 'Hayır'
        }
      ],
      { cancelable: true }
    )
  }

  handleUserIgnore = username => {
    Alert.alert(
      'Bu kullanıcıyı engellemek istiyor musunuz?', '',
      [
        {
          text: 'Evet', onPress: () => this.ignoreUser(username)
        },
        {
          text: 'Hayır'
        }
      ],
      { cancelable: true }
    )
  }

  handleRefresh = () => {
    this.setState({ refreshing: true, loading: true });
    this.fetchUsers().then(() => this.setState({ refreshing: false }))
  }

  render() {
    const { loading, refreshing } = this.state
    const { users } = this.props
    return <Container>
      <Loader loading={loading} />
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
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.handleRefresh}
            />
          }
        >
          {
            users.map(user =>
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
                          user.type === 'user' && user.isRequested ?
                            <TouchableOpacity onPress={() => this.handleRequestedUserUpgrade(user)}>
                              <Icon type='FontAwesome' name="angle-double-up" />
                            </TouchableOpacity>
                            : <></>
                        }
                      </Col>
                      <Col size={4}>
                        <Dropdown
                          options={userRoleOptions}
                          value={user.type}
                          onChange={value => this.handleChangeUserType(user.id, value)}
                        />
                      </Col>
                    </Row>
                  </Grid>
                }
                right={
                  <Button danger onPress={() => this.handleUserIgnore(user.username)}>
                    <Icon active name="trash" />
                  </Button>
                }
              />
              ))
          }
        </ScrollView>
      </Content>
    </Container>
  }
}

const mapStateToProps = state => {
  const { userReducer: { users } } = state
  return { users }
}

export default connect(mapStateToProps, { setUsers })(ManagementScreen)

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