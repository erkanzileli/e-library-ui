import React from 'react'
import { Text, Toast, SwipeRow, Button, Icon, View, Container } from 'native-base'
import { Alert, RefreshControl, ScrollView } from 'react-native'
import DialogInput from 'react-native-dialog-input';
import apolloClient from '../../utils/apolloClient';
import { AUTHORS, CREATE_AUTHOR, DELETE_AUTHOR } from '../../utils/gql';
import Loader from '../../component/Loader';
import FloatingActionButton from '../../component/FloatingActionButton';

class AuthorsTab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            authors: [],
            loading: true,
            refreshing: false,
            dialogState: {
                isDialogVisible: false,
                message: 'Yazarın ismini girin',
                hintInput: 'Yazarın ismi',
                submitText: 'Devam Et',
                submitInput: this.handleFirstName
            },
            firstName: '',
            lastName: ''
        }
        this.fetchAuthors()
    }

    fetchAuthors = async () => {
        let { data: { authors } } = await apolloClient.query({ query: AUTHORS, fetchPolicy: 'no-cache' })
        this.setState({ authors, loading: false })
    }

    newAuthor = (firstName, lastName) => {
        this.setState({
            loading: true,
            isDialogVisible: false
        })
        apolloClient.mutate({
            mutation: CREATE_AUTHOR,
            variables: { firstName, lastName }
        }).then(response => {
            this.setState({ authors: [...this.state.authors, response.data.createAuthor], loading: false })
            Toast.show({
                duration: 1000,
                position: 'bottom',
                text: 'Yazar oluşturuldu'
            })
        })
    }

    deleteAuthor = id => {
        this.setState({ loading: true })
        apolloClient.mutate({
            mutation: DELETE_AUTHOR,
            variables: { id }
        }).then(response => {
            if (response.data.deleteAuthor) {
                this.setState({
                    authors: this.state.authors.filter(author => author.id !== id),
                    loading: false
                })
                Toast.show({
                    duration: 1000,
                    position: 'bottom',
                    text: 'Yazar silindi'
                })
            }
        })
        this.setState({ loading: false })
    }

    handleRefresh = () => {
        this.setState({ refreshing: true, loading: true });
        this.fetchAuthors().then(() => this.setState({ refreshing: false }))
    }

    handleDelete = id => {
        Alert.alert(
            'Bu yazarı silmek istiyor musunuz?', '',
            [
                {
                    text: 'Evet', onPress: () => this.deleteAuthor(id)
                },
                {
                    text: 'Hayır'
                }
            ],
            { cancelable: true }
        )
    }

    handleFirstName = firstName => {
        if (String(firstName).trim()) {
            this.setState({
                firstName,
                dialogState: {
                    ...this.state.dialogState,
                    message: 'Yazarın soyadını girin',
                    hintInput: 'Yazarın soyadı',
                    submitText: 'Kaydet',
                    submitInput: text => this.handleLastName(text)
                }
            })
        } else {
            Toast.show({
                text: 'Boş değer kaydedemezsiniz!',
                duration: 1000,
                type: 'danger'
            })
        }
    }

    handleLastName = lastName => {
        if (String(lastName).trim()) {
            this.setState({
                lastName,
                dialogState: {
                    isDialogVisible: false,
                    message: 'Yazarın ismini girin',
                    hintInput: 'Yazarın ismi',
                    submitText: 'Devam Et',
                    submitInput: text => this.handleFirstName(text)
                }
            })
            this.newAuthor(this.state.firstName, lastName)
        } else {
            Toast.show({
                text: 'Boş değer kaydedemezsiniz!',
                duration: 1000,
                type: 'danger'
            })
        }
    }

    handleDialogClose = () => {
        this.setState({
            dialogState: {
                isDialogVisible: false,
                message: 'Yazarın ismini girin',
                hintInput: 'Yazarın ismi',
                submitText: 'Devam Et',
                submitInput: this.handleFirstName
            }
        })
    }

    render() {
        const { loading, refreshing, authors, dialogState } = this.state
        return <Container>
            <Loader loading={loading} />
            <FloatingActionButton
                onPress={() => this.setState({ dialogState: { ...dialogState, isDialogVisible: true } })}
                style={{ zIndex: 1, bottom: 100 }}
                icon={<Icon name='add' />}
            />
            <DialogInput
                {...dialogState}
                closeDialog={this.handleDialogClose}
                title='Yeni yazar kaydı'
                cancelText='İptal' />
            <Text style={{ paddingTop: 15, fontSize: 18, textAlign: 'center' }}>
                Yazarlar
              </Text>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={this.handleRefresh} />}>
                {
                    authors.map(author =>
                        (<SwipeRow key={author.id}
                            leftOpenValue={100}
                            disableLeftSwipe
                            body={
                                <View>
                                    <Text style={{ paddingTop: 15, fontSize: 18, textAlign: 'center' }}>
                                        {`${author.firstName} ${author.lastName}`}
                                    </Text>
                                </View>
                            }
                            left={
                                <Button danger onPress={() => this.handleDelete(author.id)}>
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

export default AuthorsTab
