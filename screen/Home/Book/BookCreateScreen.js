import React from 'react'
import { } from "react-native";
import { Item, Input, Label, Header, Left, Button, Icon, Title, Right, Toast, Body, View, Container, Text } from 'native-base';
import { connect } from "react-redux";
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import apolloClient from '../../../utils/apolloClient';
import Loader from '../../../component/Loader';
import Dropdown from '../../../component/Dropdown';
import { CREATE_BOOK, ALL_AUTHORS_AND_CATEGORIES } from '../../../utils/gql';
import { getUserName } from '../../../utils/authorization';
import { addBook } from "../../../redux/actions";
import { API_URL } from '../../../env/environment';
import { getToken } from '../../../storage';

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

class BookCreateScreen extends React.Component {
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
            authors: [],
            bookCategories: [],
            authorOptions: [],
            bookCategoryOptions: [],
            file: null,
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
        let { data: { authors, bookCategories } } = await apolloClient
            .query({
                query: ALL_AUTHORS_AND_CATEGORIES,
                fetchPolicy: 'no-cache'
            })
        const authorOptions = authors.map(author => ({ value: author.id, label: `${author.firstName} ${author.lastName}` }))
        const bookCategoryOptions = bookCategories.map(category => ({ value: category.id, label: category.name }))
        this.setState({
            authors, bookCategories, authorOptions, bookCategoryOptions,
            authorId: authorOptions.length > 0 ? authorOptions[0].value : null,
            categoryId: bookCategoryOptions.length > 0 ? bookCategoryOptions[0].value : null
        })
    }

    handleSubmit = ({ name, title, description, pageCount, authorId, categoryId, file } = this.state) => {
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
                duration: 1000,
                type: 'danger'
            })
        } else if (!file) {
            Toast.show({
                text: "Cihazınızdan kitabı seçmeyi unutmayın!",
                duration: 1000,
                type: 'warning'
            })
        }
        else {
            this.submit()
        }
    }

    submit = async ({ name, title, description, pageCount, authorId, categoryId, file } = this.state) => {
        this.setState({ loading: true })
        const username = await getUserName()
        apolloClient.mutate({
            mutation: CREATE_BOOK,
            variables: { name, title, description, pageCount, authorId, username, categoryId }
        }).then(response => {
            Toast.show({
                text: "Kaydedildi!",
                duration: 3000
            })
            const book = response.data.createBook
            this.props.addBook(book)
            this.uploadFile(book.id, file.uri, file.fileName)
            Toast.show({
                text: "Kitap sisteme eklendi.",
                duration: 1000,
                type: 'success'
            })
            this.setState({ loading: false })
            this.props.navigation.navigate('Home')
        })
    }

    uploadFile = async (bookId, uri, fileName) => {
        const token = await getToken()
        const data = new FormData();
        data.append('file',
            {
                uri: uri,
                type: "multipart/form-data",
                name: fileName,
            });
        fetch(`${API_URL}/file/upload/${bookId}`, {
            body: data,
            method: 'post',
            headers: {
                'Authorization': token,
                'Content-Type': 'multipart/form-data',
            }
        })
            .catch(err => { console.warn(err) })
    }

    handeFileChoose = () => {
        DocumentPicker.show({
            filetype: [DocumentPickerUtil.pdf()],
        }, (error, res) => {
            if (res) {
                this.setState({ file: res })
            }
        })
    }

    render() {
        const { name, title, description, pageCount, loading, authorOptions, authorId, categoryId, bookCategoryOptions, file } = this.state
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
                            value={pageCount}
                            onChangeText={value => this.setState({ pageCount: value })}
                        />
                    </Item>
                    <Dropdown
                        value={authorId}
                        label='Yazar'
                        options={authorOptions}
                        onChange={value => this.setState({ authorId: value })}
                    />
                    <Item fixedLabel error={!validate.title}>
                        <Label> {file ? `${file.fileName} dosyası seçildi` : 'Dosya seçin'} </Label>
                        <Button onPress={this.handeFileChoose}>
                            <Text>
                                {
                                    file ? 'Farklı dosya seç' : 'Dosya seç'
                                }
                            </Text>
                        </Button>
                    </Item>
                </View>
            </View>
        </Container>
    }
}

export default connect(null, { addBook })(BookCreateScreen)