import React from 'react'
import {View} from 'react-native'
import Loader from '../../component/Loader'
import apolloClient from "../../utils/apolloClient";
import {AUTHORS} from "../../gql/author";

export default class AuthorListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            authors: []
        }
    }

    async componentDidMount() {
        this.setState({loading: true});
        await apolloClient.query({
            query: AUTHORS
        }).then(response => {
            this.setState({
                loading: false,
                authors: response.data.authors
            })
        }).catch(error => {
            console.warn(error);
            this.setState({loading: false})
        })
    }

    render() {
        const {loading} = this.state;
        return <View>
            <Loader loading={loading}/>
            
        </View>
    }
}
