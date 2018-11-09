import React from 'react'
import { Container, Header, Card, CardItem, Text, Body, Content, View, Right, Icon, Left } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

function BookListItem(props) {
    return <View>
        <Content>
            <Card>
                <CardItem header bordered>
                    <Text>Kitap Adı</Text>
                    <Right>
                        <Text>Ekleme Tarihi</Text>
                    </Right>
                </CardItem>
                <CardItem bordered>
                    <Body>
                        <Text>
                            Lorem ipsum dolar sit amet
                            Lorem ipsum dolar sit amet
                            Lorem ipsum dolar sit amet
                            Lorem ipsum dolar sit amet
                        </Text>
                    </Body>
                </CardItem>
                <CardItem footer bordered>
                    <Grid>
                        <Col size={6}>
                            <Grid>
                                <Col size={6}>
                                    <Text>Erkan Zileli</Text>
                                </Col>
                                <Col size={4}>
                                    <Row>
                                        <Text>15 </Text>
                                        <Icon type='FontAwesome' name='heart' />
                                    </Row>
                                </Col>
                            </Grid>
                        </Col>
                        <Col size={4}>
                            <Text>Kitap Yazarı Kitap Yazarı</Text>
                        </Col>
                    </Grid>
                </CardItem>
            </Card>
        </Content>
    </View>
}

export default BookListItem