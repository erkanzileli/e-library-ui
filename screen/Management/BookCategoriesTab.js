import React from 'react'
import { Text, Content, Toast, SwipeRow, Button, Icon, View, Container } from 'native-base'
import { Alert, RefreshControl, ScrollView } from 'react-native'
import DialogInput from 'react-native-dialog-input';
import apolloClient from '../../utils/apolloClient';
import { IGNORE_USER, BOOK_CATEGORIES, CREATE_BOOK_CATEGORY, DELETE_BOOK_CATEGORY } from '../../utils/gql';
import Loader from '../../component/Loader';
import FloatingActionButton from '../../component/FloatingActionButton';

class BookCategoriesTab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bookCategories: [],
            loading: true,
            refreshing: false,
            isDialogVisible: false
        }
        this.fetchCategories()
    }

    fetchCategories = async () => {
        let { data: { bookCategories } } = await apolloClient.query({ query: BOOK_CATEGORIES, fetchPolicy: 'no-cache' })
        this.setState({ bookCategories, loading: false })
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
                duration: 2000
            })
            this.setState({ loading: false })
        })
    }

    newCategory = name => {
        this.setState({
            loading: true,
            isDialogVisible: false
        })
        apolloClient.mutate({
            mutation: CREATE_BOOK_CATEGORY,
            variables: { name }
        }).then(response => {
            if (response.data.createBookCategory !== null) {
                this.setState({ bookCategories: [...this.state.bookCategories, response.data.createBookCategory], loading: false })
            } else {
                Alert.alert(
                    'Bu kategori zaten sistemde mevcut!',
                    '',
                    [],
                    { cancelable: true }
                )
                this.setState({
                    loading: false,
                })
            }
        })
    }

    deleteCategory = id => {
        this.setState({ loading: true })
        apolloClient.mutate({
            mutation: DELETE_BOOK_CATEGORY,
            variables: { id }
        }).then(response => {
            if (response.data.deleteBookCategory) {
                this.setState({
                    bookCategories: this.state.bookCategories.filter(category => category.id !== id),
                    loading: false
                })
            }
        })
        this.setState({ loading: false })
    }

    handleDelete = id => {
        Alert.alert(
            'Bu kategoriyi silmek istiyor musunuz?', '',
            [
                {
                    text: 'Evet', onPress: () => this.deleteCategory(id)
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
        this.fetchCategories().then(() => this.setState({ refreshing: false }))
    }

    handleSubmit = text => {
        if (String(text).trim()) {
            this.newCategory(text)
        } else {
            Toast.show({
                text: 'Boş değer kaydedemezsiniz!',
                duration: 1000,
                type:'danger'
            })
        }
    }

    render() {
        const { loading, refreshing, bookCategories, isDialogVisible } = this.state
        return <Container>
            <Loader loading={loading} />
            <FloatingActionButton
                onPress={() => this.setState({ isDialogVisible: true })}
                style={{ zIndex: 1, bottom: 100 }}
                icon={<Icon name='add' />}
            />
            <DialogInput
                isDialogVisible={isDialogVisible}
                submitInput={text => this.handleSubmit(text)}
                closeDialog={() => this.setState({ isDialogVisible: false })}
                title='Yeni Kategori Kaydı'
                message='Kategori adını girin'
                submitText='Oluştur'
                cancelText='İptal' />
            <Text style={{ paddingTop: 15, fontSize: 18, textAlign: 'center' }}>
                Kitap Kategorileri
              </Text>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={this.handleRefresh} />}>
                {
                    bookCategories.map(category =>
                        (<SwipeRow key={category.id}
                            leftOpenValue={100}
                            disableLeftSwipe
                            body={
                                <View>
                                    <Text style={{ paddingTop: 15, fontSize: 18, textAlign: 'center' }}>
                                        {category.name}
                                    </Text>
                                </View>
                            }
                            left={
                                <Button danger onPress={() => this.handleDelete(category.id)}>
                                    <Icon active name="trash" />
                                </Button>
                            }
                        />
                        ))
                }
            </ScrollView>
        </Container>
    }
}

export default BookCategoriesTab
