import React from 'react'
import { Item, Input, Label, Header, Left, Button, Icon, Title, Right, Toast, Body, View, Container } from 'native-base';
import { Form } from 'react-final-form';
import apolloClient from '../../utils/apolloClient';
import Loader from '../../component/Loader';
import { UPDATE_USER } from '../../utils/gql';

function validations(values) {
    let result = {
        firstName: true,
        lastName: true,
        email: true
    }
    if (values.firstName && !/^.{0,50}$/.test(values.firstName)) {
        result.firstName = false
    }
    if (!values.firstName) {
        result.firstName = false
    }
    if (values.lastName && !/^.{0,50}$/.test(values.lastName)) {
        result.lastName = false
    }
    if (!values.lastName) {
        result.lastName = false
    }
    if (values.email) {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            result.email = false
        }
        if (!/^.{0,254}$/.test(values.email)) {
            result.email = false
        }
    } else {
        result.email = false
    }
    return result
}

export class EditProfileScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header: <></>
    });

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            ...props.navigation.state.params.user
        }
    }

    handleSubmit = ({ firstName, lastName, email } = this.state) => {
        const validate=validations({firstName,lastName,email})
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

        submit =({id, firstName, lastName, email} = this.state) => {
            this.setState({ loading: true })
        apolloClient.mutate({
            mutation: UPDATE_USER,
            variables: { id, firstName, lastName, email }
        }).then(response => {

            Toast.show({
                text: "Kaydedildi!",
                buttonText: "Okay",
                duration: 3000
            })
            this.setState({ loading: false })
            this.props.navigation.navigate({ routeName: 'ProfileHome', params: { userId: response.data.updateUser.id, refresh: true} })
        })
    }


    render() {
        const { firstName, lastName, email, loading } = this.state
        const {navigation} = this.props
        const validate = validations({ firstName, lastName, email })
        return <Container>
            <Header>
            <Left>
                <Button transparent onPress={() => navigation.goBack()}>
                    <Icon name='arrow-back' />
                </Button>
            </Left>
            <Body>
                <Title>Profil Düzenleme</Title>
            </Body>
            <Right>
                <Button transparent onPress={() => this.handleSubmit()}>
                    <Icon type='MaterialIcons' name='save' />
                </Button>
            </Right>
        </Header>
            <Loader loading={loading} />
            <View style={{ padding: 10 }}>
                <Form
                    id='userEditForm'
                    onSubmit={values => console.warn(values)}
                    render={() => (<>
                        <Item fixedLabel error={!validate.firstName}>
                            <Label> İsim </Label>
                            <Input
                                keyboardType='default'
                                value={firstName}
                                onChangeText={(value) => this.setState({ firstName: value })}
                            />
                        </Item>
                        <Item fixedLabel error={!validate.lastName}>
                            <Label> Soyisim </Label>
                            <Input
                                keyboardType='default'
                                value={lastName}
                                onChangeText={(value) => this.setState({ lastName: value })}
                            />
                        </Item>
                        <Item fixedLabel error={!validate.email}>
                            <Label> E-Posta </Label>
                            <Input
                                keyboardType='default'
                                value={email}
                                onChangeText={(value) => this.setState({ email: value })}
                            />
                        </Item>
                    </>)}
                />
            </View>
        </Container>
    }
}