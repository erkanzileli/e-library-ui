import React from 'react'
import { Text, Content, Toast, SwipeRow, Button, Icon, Grid, Row, Col } from 'native-base'
import { Alert, RefreshControl, ScrollView, TouchableOpacity } from 'react-native'
import apolloClient from '../../utils/apolloClient';
import { getUserName } from '../../utils/authorization';
import { USER_TO_EDITOR, CHANGE_USER_TYPE, IGNORE_USER, GET_USERS, CHANGE_USER_STATUS } from '../../utils/gql';
import Loader from '../../component/Loader';
import Dropdown from '../../component/Dropdown';

const userRoleOptions = [
    { label: 'Yönetici', value: 'admin' },
    { label: 'Moderatör', value: 'moderator' },
    { label: 'Editör', value: 'editor' },
    { label: 'Kullanıcı', value: 'user' }
]

const styles = {
    userCol: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        alignSelf: 'flex-start',
        paddingLeft: 15,
        paddingTop: 15
    }
}

class UsersTab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            loading: true,
            refreshing: false
        }
        this.fetchUsers()
    }

    fetchUsers = async () => {
        let { data: { users } } = await apolloClient.query({ query: GET_USERS, fetchPolicy: 'network-only' })
        const username = await getUserName()
        users = users.filter(user => user.username !== username)
        this.setState({ users, loading: false })
    }

    upgradeUser = id => {
        this.setState({ loading: true })
        apolloClient.mutate({
            mutation: USER_TO_EDITOR,
            variables: { id }
        }).then(response => {
            const { data: { userToEditor } } = response
            let users = this.state.users
            users[users.findIndex(user => user.id === id)] = userToEditor
            Toast.show({
                text: "Kullanıcı yükseltild!",
                duration: 3000
            })
            this.setState({ users, loading: false })
        })
    }

    changeUserType = (id, type) => {
        this.setState({ loading: true })
        apolloClient.mutate({
            mutation: CHANGE_USER_TYPE,
            variables: { id, type }
        }).then(response => {
            const { data: { changeUserType } } = response
            let users = this.state.users
            users[users.findIndex(user => user.id === id)] = changeUserType
            Toast.show({
                text: "Kullanıcı yetkisi değiştirildi!",
                duration: 3000
            })
            this.setState({ users, loading: false })
        })
    }

    ignoreUser = async username => {
        this.setState({ loading: true })
        apolloClient.mutate({
            mutation: IGNORE_USER,
            variables: { username }
        }).then(response => {
            const { data: { ignoreUser } } = response
            let users = this.state.users
            users[users.findIndex(user => user.username === username)] = ignoreUser
            Toast.show({
                text: "Kullanıcı engellendi!",
                duration: 3000
            })
            this.setState({ users, loading: false })
        })
    }

    changeUserStatus = async (username, status) => {
        // this.setState({ loading: true })
        apolloClient.mutate({
            mutation: CHANGE_USER_STATUS,
            variables: { username, status: status === 1 ? false : true }
        }).then(response => {
            const { data: { changeUserStatus } } = response
            let users = this.state.users
            users[users.findIndex(user => user.username === username)] = changeUserStatus
            Toast.show({
                text: status === 1 ? "Kullanıcı engellendi!" : "Kullanıcı engeli kaldırıldı!",
                duration: 3000
            })
            this.setState({ users, loading: false })
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

    handleUserChangeStatus = (username, status) => {
        Alert.alert(
            status === 1 ? 'Bu kullanıcıyı engellemek istiyor musunuz?' : 'Bu kullanıcının engellini kaldırmak istiyor musunuz?', '',
            [
                {
                    text: 'Evet', onPress: () => this.changeUserStatus(username, status)
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
        const { users, loading, refreshing } = this.state
        return <Content>
            <Loader loading={loading} />
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
                            leftOpenValue={100}
                            disableLeftSwipe
                            body={
                                <Grid>
                                    <Row>
                                        <Col size={5}>
                                            <TouchableOpacity>
                                                <Text style={{ ...styles.userCol, color: user.status === 1 ? "#008080" : 'red' }}>
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
                            left={
                                <Button danger={user.status === 1} success={user.status === 0} onPress={() => this.handleUserChangeStatus(user.username, user.status)}>
                                    <Icon active name={user.status === 1 ? 'trash' : 'arrow-up'} />
                                </Button>
                            }
                        />
                        ))
                }
            </ScrollView>
        </Content>
    }
}

export default UsersTab
