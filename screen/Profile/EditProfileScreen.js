import React from 'react'
import { Item, Input, Label, Header, Left, Button, Icon, Title, Right, Toast, Body, View } from 'native-base';
import { Form } from 'react-final-form';
import apolloClient from '../../utils/apolloClient';
import Loader from '../../component/Loader';

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
        header: <Header>
            <Left>
                <Button transparent onPress={() => navigation.goBack()}>
                    <Icon name='arrow-back' />
                </Button>
            </Left>
            <Body>
                <Title>Profil Düzenleme</Title>
            </Body>
            <Right>
                <Button transparent onPress={() => { }}>
                    <Icon type='MaterialIcons' name='save' />
                </Button>
            </Right>
        </Header>
    });

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            firstName: props.firstName,
            lastName: props.lastName,
            email: props.email
        }

    }

    handleSubmit = ({ firstName, lastName, email } = this.state, { id } = this.props) => {
        this.setState({ loading: true })
        apolloClient.mutate({
            mutation: undefined,
            variables: { id, firstName, lastName, email }
        }).then(response => {

            Toast.show({
                text: "Kaydedildi!",
                buttonText: "Okay",
                duration: 3000
            })
            this.setState({ loading: false })
        })
    }

    render() {
        const { firstName, lastName, email, loading } = this.state
        const validate = validations({ firstName, lastName, email })
        return <View>
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
        </View>
    }
}