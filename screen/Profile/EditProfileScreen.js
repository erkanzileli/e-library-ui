import React from 'react'
import { Item, Input, Label, Header, Left, Button, Icon, Title, Right, Toast, Body, View, Container } from 'native-base';
import { connect } from "react-redux";
import apolloClient from '../../utils/apolloClient';
import Loader from '../../component/Loader';
import { UPDATE_USER } from '../../utils/gql';
import { setUser, setLoading } from '../../redux/actions';

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

class EditProfileScreen extends React.Component {
    static navigationOptions = () => ({
        header: <></>
    });

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            ...props.user
        }
    }

    handleSubmit = ({ firstName, lastName, email } = this.state) => {
        const validate = validations({ firstName, lastName, email })
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

    submit = async ({ id, firstName, lastName, email } = this.state, { setLoading, setUser, navigation } = this.props) => {
        setLoading(true)
        const { data: { updateUser } } = await apolloClient.mutate({
            mutation: UPDATE_USER,
            variables: { id, firstName, lastName, email }
        })
        setUser(updateUser)
        setLoading(false)
        Toast.show({
            text: "Kaydedildi!",
            buttonText: "Okay",
            duration: 3000
        })
        navigation.goBack()
    }

    render() {
        const { firstName, lastName, email } = this.state
        const { navigation, loading } = this.props
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
            </View>
        </Container>
    }
}

const mapStateToProps = state => {
    const { userReducer: { user }, commonReducer: { loading } } = state
    return { user, loading }
}

export default connect(mapStateToProps, { setUser, setLoading })(EditProfileScreen)
