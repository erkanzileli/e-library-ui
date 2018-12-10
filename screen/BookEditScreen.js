import React from 'react'
import { Item, Input, Label, Header, Left, Button, Icon, Title, Right, Toast, Body, View, Container } from 'native-base';
import apolloClient from '../../../utils/apolloClient';
import Loader from '../../../component/Loader';
import Dropdown from '../../../component/Dropdown';
import { AUTHORS, BOOK_CATEGORIES, CREATE_BOOK } from '../../../utils/gql';

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
    if (!values.authorId) {
        result.authorId = false
    }
    if (!values.categoryId) {
        result.categoryId = false
    }
    return result
}

export class BookEditScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header: <></>
    });

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            name: null,
            title: null,
            description: null,
            pageCount: null,
            authorId: null,
            categoryId: null,
            userId: 1,
            authors: [],
            bookCategories: [],
            validation: {
                name: true,
                title: true,
                description: true,
                pageCount: true,
                authorId: true,
                categoryId: true
            }
        }
    }

    async componentDidMount(props) {
        let { data: { authors } } = await apolloClient.query({ query: AUTHORS, fetchPolicy: 'no-cache' })
        let { data: { bookCategories } } = await apolloClient.query({ query: BOOK_CATEGORIES, fetchPolicy: 'no-cache' })
        this.setState({ authors, bookCategories })
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
                buttonText: "Tamam",
                duration: 3000,
                type: 'danger'
            })
        } else {
            this.submit()
        }
    }

    submit = ({ name, title, description, pageCount, authorId, userId, categoryId } = this.state) => {
        this.setState({ loading: true })
        apolloClient.mutate({
            mutation: CREATE_BOOK,
            variables: { name, title, description, pageCount, authorId, userId, categoryId }
        }).then(response => {
            Toast.show({
                text: "Kaydedildi!",
                buttonText: "Okay",
                duration: 3000
            })
            this.setState({ loading: false })
            this.props.navigation.navigate({ routeName: 'Home', params: { bookId: response.data.createBook.id } })
        })
    }


    render() {
        const { name, title, description, pageCount, loading, categoryId, authorId, authors, bookCategories } = this.state
        const { navigation } = this.props
        const authorOptions = authors.map(author => ({ value: author.id, label: `${author.firstName} ${author.lastName}` }))
        const bookCategoryOptions = bookCategories.map(category => ({ value: category.id, label: category.name }))
        const validate = validations({ name, title, description })
        return <Container>
            <Header>
                <Left>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title>Kitap Oluşturma</Title>
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
                            keyboardType='default'
                            value={title}
                            onChangeText={value => this.setState({ title: value })}
                        />
                    </Item>
                    <Dropdown
                        label='Kategori'
                        options={bookCategoryOptions}
                        onChange={value => this.setState({ categoryId: value })}
                    />
                    <Item fixedLabel error={!validate.description}>
                        <Label> Açıklama </Label>
                        <Input
                            keyboardType='default'
                            value={description}
                            onChangeText={value => this.setState({ description: value })}
                        />
                    </Item>
                    <Item fixedLabel error={pageCount ? pageCount < 1 : false}>
                        <Label> Sayfa Sayısı </Label>
                        <Input
                            keyboardType='numeric'
                            value={pageCount}
                            onChangeText={value => this.setState({ pageCount: value })}
                        />
                    </Item>
                    <Dropdown
                        label='Yazar'
                        options={authorOptions}
                        onChange={value => this.setState({ authorId: value })}
                    />
                </View>
            </View>
        </Container>
    }
}