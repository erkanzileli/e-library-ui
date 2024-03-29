import React from 'react'
import { Item, Input, Label, Header, Left, Button, Icon, Title, Right, Toast, Body, View, Container } from 'native-base';
import { connect } from "react-redux";
import apolloClient from '../utils/apolloClient';
import Loader from '../component/Loader';
import Dropdown from '../component/Dropdown';
import { ALL_AUTHORS_AND_CATEGORIES, UPDATE_BOOK } from '../utils/gql';
import { setBook, updateBook } from '../redux/actions';
import { getToken } from '../storage';

function validations(values) {
    let result = {
        name: true,
        title: true,
        description: true,
        pageCount: true,
        authorId: true,
        categoryId: true
    }
    if (values.name && !/^.{0,50}$/.test(values.name)) {
        result.name = false
    }
    if (!values.name) {
        result.name = false
    }
    if (values.title && !/^.{0,50}$/.test(values.title)) {
        result.title = false
    }
    if (!values.title) {
        result.title = false
    }
    if (values.description && !/^.{0,250}$/.test(values.description)) {
        result.description = false
    }
    if (!values.description) {
        result.description = false
    }
    if (values.pageCount && values.pageCount < 1) {
        result.pageCount = false
    }
    if (!values.pageCount) {
        result.pageCount = false
    }
    if (values.authorId === 'none') {
        result.authorId = false
    }
    if (values.categoryId === 'none') {
        result.categoryId = false
    }
    return result
}

class BookEditScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header: <></>
    });

    constructor(props) {
        super(props)
        const book = props.navigation.getParam('book')
        this.state = {
            authorOptions: [],
            bookCategoryOptions: [],
            loading: false,
            validation: {
                name: true,
                title: true,
                description: true,
                pageCount: true,
                authorId: true,
                categoryId: true
            },
            ...book,
            authorId: book.author ? book.author.id : 'none',
            categoryId: book.category ? book.category.id : 'none'
        }
    }

    async componentDidMount(props) {
        let { data: { authors, bookCategories } } = await apolloClient
            .query({
                query: ALL_AUTHORS_AND_CATEGORIES,
                fetchPolicy: 'no-cache'
            })
        const authorOptions = [
            { value: 'none', label: 'Seçiniz' },
            ...authors.map(author => ({ value: author.id, label: `${author.firstName} ${author.lastName}` }))
        ]
        const bookCategoryOptions = [
            { value: 'none', label: 'Seçiniz' },
            ...bookCategories.map(category => ({ value: category.id, label: category.name }))
        ]
        this.setState({
            authors,
            bookCategories,
            authorOptions,
            bookCategoryOptions,
            authorId: this.state.authorId || authorOptions[0].value,
            categoryId: this.state.categoryId || bookCategoryOptions[0].value
        })
    }

    handleSubmit = ({ name, title, description, pageCount, authorId, categoryId } = this.state) => {
        const validate = validations({ name, title, description, pageCount, authorId, categoryId })
        let valid = true
        Object.keys(validate).forEach(key => {
            if (!validate[key]) {
                valid = false
            }
        })
        if (!valid) {
            Toast.show({
                text: "Alanların doğruluğunu kontrol edin veya boş bırakmayın!",
                duration: 2000,
                type: 'danger'
            })
        } else {
            this.submit()
        }
    }

    submit = async ({ id, name, title, description, pageCount, authorId, user, categoryId } = this.state) => {
        this.setState({ loading: true })
        apolloClient.mutate({
            mutation: UPDATE_BOOK,
            variables: {
                id,
                token: String(await getToken()).replace('JWT ', ''),
                authorId,
                userId: user.id,
                categoryId,
                name,
                title,
                description,
                pageCount
            }
        }).then(response => {
            Toast.show({
                text: "Kaydedildi!",
                duration: 2000,
                type: 'success'
            })
            this.props.setBook(response.data.updateBook)
            this.setState({ loading: false })
            this.props.navigation.navigate('BookDetail')
        }).catch(err => console.warn(err))
    }

    render() {
        const {
            name,
            title,
            description,
            pageCount,
            loading,
            authorId,
            categoryId,
            authorOptions,
            bookCategoryOptions
        } = this.state
        const { navigation } = this.props
        const validate = validations({ name, title, description })
        return <Container>
            <Header>
                <Left>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title>Kitap Düzenleme</Title>
                </Body>
                <Right>
                    <Button transparent onPress={() => this.handleSubmit()}>
                        <Icon type='MaterialIcons' name='save' />
                    </Button>
                </Right>
            </Header>
            <View>
                <Loader loading={loading} />
                <View style={{ padding: 10 }}>
                    <Item fixedLabel error={!validate.name}>
                        <Label> Kitap Adı </Label>
                        <Input
                            keyboardType='default'
                            value={name}
                            onChangeText={value => this.setState({ name: value })}
                        />
                    </Item>
                    <Item fixedLabel error={!validate.title}>
                        <Label> Konu </Label>
                        <Input
                            multiline
                            keyboardType='default'
                            value={title}
                            onChangeText={value => this.setState({ title: value })}
                        />
                    </Item>
                    <Dropdown
                        value={categoryId}
                        label='Kategori'
                        options={bookCategoryOptions}
                        onChange={value => this.setState({ categoryId: value })}
                    />
                    <Item fixedLabel error={!validate.description}>
                        <Label> Açıklama </Label>
                        <Input
                            multiline
                            keyboardType='default'
                            value={description}
                            onChangeText={value => this.setState({ description: value })}
                        />
                    </Item>
                    <Item fixedLabel error={pageCount ? pageCount < 1 : false}>
                        <Label> Sayfa Sayısı </Label>
                        <Input
                            keyboardType='numeric'
                            value={String(pageCount)}
                            onChangeText={value => this.setState({ pageCount: value })}
                        />
                    </Item>
                    <Dropdown
                        value={authorId}
                        label='Yazar'
                        options={authorOptions}
                        onChange={value => this.setState({ authorId: value })}
                    />
                </View>
            </View>
        </Container>
    }
}

const mapStateToProps = state => {
    const { bookReducer: { book }, userReducer: { user } } = state
    return { book, user }
}

export default connect(mapStateToProps, { setBook, updateBook })(BookEditScreen)