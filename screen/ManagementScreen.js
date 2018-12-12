import React from 'react'
import { Text, Container, Content, Toast, SwipeRow, Button, Icon, Grid, Row, Col } from 'native-base'
import { Alert, TouchableOpacity } from 'react-native'
import { connect } from "react-redux";
import Dropdown from '../component/Dropdown';
import { setUsers } from "../redux/actions";
import apolloClient from '../utils/apolloClient';
import { GET_USERS, USER_TO_EDITOR } from '../utils/gql';
import Loader from '../component/Loader';

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
      loading: true
    }
    this.fetchUsers()
  }

  fetchUsers = async () => {
    const { data: { users } } = await apolloClient.query({ query: GET_USERS, fetchPolicy: 'no-cache' })
    this.props.setUsers(users)
    this.setState({ loading: false })
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

  upgradeUser = id => {
    this.setState({ loading: true })
    apolloClient.mutate({
      mutation: USER_TO_EDITOR,
      variables: { id }
    }).then(response => {
      const { data: { userToEditor } } = response
      let { users } = this.props
      users[users.findIndex(user => user.id === id)] = { ...userToEditor }
      this.props.setUsers(users)
      Toast.show({
        text: "Kullanıcı yükseltild!",
        buttonText: "Tamam",
        duration: 3000
      })
    })
    this.setState({ loading: false })
  }

  render() {
    const { loading } = this.state
    const { users } = this.props
    const userRows = users.map(user =>
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
                <Dropdown options={userRoleOptions} value={user.type} />
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
        {userRows}
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