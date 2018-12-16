import React from 'react'
import { } from "react-native";
import { Item, Input, Label, Header, Left, Button, Icon, Title, Right, Toast, Body, View, Container } from 'native-base';
import { connect } from "react-redux";
import apolloClient from '../../../utils/apolloClient';
import Loader from '../../../component/Loader';
import Dropdown from '../../../component/Dropdown';
import { CREATE_BOOK, ALL_AUTHORS_AND_CATEGORIES } from '../../../utils/gql';
import { getUserName } from '../../../utils/authorization';
import { addBook } from "../../../redux/actions";
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import { API_URL } from '../../../env/environment';
var RNFS = require('react-native-fs');
import RNFetchBlob from 'rn-fetch-blob'

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
            userId: 1,
            authors: [],
            bookCategories: [],
            authorOptions: [],
            bookCategoryOptions: [],
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

    submit = async ({ name, title, description, pageCount, authorId, categoryId } = this.state) => {
        this.setState({ loading: true })
        const username = await getUserName()
        apolloClient.mutate({
            mutation: CREATE_BOOK,
            variables: { name, title, description, pageCount, authorId, username, categoryId }
        }).then(response => {
            Toast.show({
                text: "Kaydedildi!",
                buttonText: "Okay",
                duration: 3000
            })
            this.props.addBook(response.data.createBook)
            this.setState({ loading: false })
            this.props.navigation.navigate({ routeName: 'Home', params: { bookId: response.data.createBook.id } })
        })
    }

    uploadFile = async ({ uri, fileType, fileName, fileSize }) => {
        // const data = new FormData();
        // data.append('file',
        //     {
        //         uri: uri,
        //         type: "multipart/form-data", 
        //         name: fileName,
        //     });
        // // let xhr = new XMLHttpRequest()
        // // xhr.open('POST', `${API_URL}/file/upload/21`)
        // // xhr.send(data)
        // fetch(`${API_URL}/file/upload/21`, {
        //     body: data,
        //     method: 'post',
        //     headers: {
        //         'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTU0NTQyNjY1Nn0.1jCjq8OQxL8gwmq4FiKSfBujolBf-CNxOHj3zzxY2yvEyWoAzmrus5i7sme4o9RxF1mjozjUNJ76im9CpZ-YDQ',
        //         'Content-Type': 'multipart/form-data',
        //     }
        // })
        // .then(r => console.warn(r))
        // .catch(err => { console.warn(err) })
        RNFetchBlob.config({
            addAndroidDownloads: {
                useDownloadManager: true, // <-- this is the only thing required
                // Optional, override notification setting (default to true)
                notification: true,
                // Optional, but recommended since android DownloadManager will fail when
                // the url does not contains a file extension, by default the mime type will be text/plain
                mime: 'application/pdf',
                description: 'File downloaded by download manager.'
            }
        }).fetch('GET', `${API_URL}/file/download/21-dummy.pdf`, {
            'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTU0NTQyNjY1Nn0.1jCjq8OQxL8gwmq4FiKSfBujolBf-CNxOHj3zzxY2yvEyWoAzmrus5i7sme4o9RxF1mjozjUNJ76im9CpZ-YDQ',
        }).then((res) => {
            let status = res.info().status;
            console.warn('The file saved to ', res.path())

            if (status == 200) {
                // the conversion is done in native code
                let base64Str = res.base64()
                // the following conversions are done in js, it's SYNC
                let text = res.text()
                let json = res.json()
            } else {
                // handle other status codes
            }
        })
            // Something went wrong:
            .catch((errorMessage, statusCode) => {
                // error handling
            })
        // fetch(`${API_URL}/file/download/21-dummy.pdf`, {
        //     method: 'get',
        //     headers: {
        //         'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTU0NTQyNjY1Nn0.1jCjq8OQxL8gwmq4FiKSfBujolBf-CNxOHj3zzxY2yvEyWoAzmrus5i7sme4o9RxF1mjozjUNJ76im9CpZ-YDQ'
        //     }
        // })
        // .then(r => console.warn(r))
        // .catch(err => { console.warn(err) })
    }

    handeFileChoose = () => {

        DocumentPicker.show({
            filetype: [DocumentPickerUtil.pdf()],
        }, (error, res) => {
            this.uploadFile({ ...res })
        })

        // const data = new FormData();
        // data.append('file', JSON.stringify({
        // uri: res.fileUri,
        // type: res.fileType,
        // name: res.fileName,
        // }));
        // data.append('Authorization', 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG9ydWsiLCJyb2xlIjoidXNlciIsImV4cCI6MTU0NDk5MzYwNn0.JIP_8UyR1dZQ5OyUm0dz9algQCFfmyLK5HGR_9iu4h6PyltErKDU9G0A0rEjQ1ydmnrfJtnJu3fR3gD1ioQkRQ')
        // let xhr = new XMLHttpRequest()
        // xhr.open('POST', `${API_URL}/file/upload/21`)
        // xhr.send(data)
        // fetch(`${API_URL}/file/upload/21`, {
        //     body: data,
        //     method: 'post',
        //     headers: {
        //         'Accept':'application/json',
        //         'Content-Type': 'multipart/form-data',
        //         'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG9ydWsiLCJyb2xlIjoidXNlciIsImV4cCI6MTU0NDk5MzYwNn0.JIP_8UyR1dZQ5OyUm0dz9algQCFfmyLK5HGR_9iu4h6PyltErKDU9G0A0rEjQ1ydmnrfJtnJu3fR3gD1ioQkRQ'
        //     }
        // }).then(r=>console.warn(r))
        // .catch(err=>{
        //     console.warn(err)
        // })
        // });
    }

    render() {
        const { name, title, description, pageCount, loading, authorOptions, authorId, categoryId, bookCategoryOptions } = this.state
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
                    <Button transparent onPress={() => this.handeFileChoose()}>
                        <Icon type='MaterialIcons' name='upload' />
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
                </View>
            </View>
        </Container>
    }
}

export default connect(null, { addBook })(BookCreateScreen)