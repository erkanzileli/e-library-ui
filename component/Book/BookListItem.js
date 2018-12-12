import React from 'react'
import { Card, CardItem, Text, Body, Content, View, Icon } from 'native-base';
import { TouchableOpacity } from 'react-native'
import { Col, Row, Grid } from 'react-native-easy-grid';
import StarRating from 'react-native-star-rating';
const styles = {
    authorText: {
        fontSize: 13,
        color: 'black'
    },
    downloadCountText: {
        fontSize: 16,
        color: 'black'
    }
}

export default function BookListItem(props) {
    const { id, author, title, downloadCount, likeCount, name, saved } = props.book
    return <Content style={{ flex: 1 }}>
        <Card>
            <CardItem header bordered>
                <Grid>
                    <Row>
                        <Col size={5}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('BookDetail', { bookId: id })}>
                                <Text style={{ fontSize: 20 }}>{name}</Text>
                            </TouchableOpacity>
                        </Col>
                        <Col size={3}>
                            <StarRating
                                disabled
                                maxStars={5}
                                starSize={20}
                                rating={5 * parseFloat(likeCount / downloadCount)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Text style={styles.authorText}>
                                {`${author.firstName} ${author.lastName}`}
                            </Text>
                        </Col>
                    </Row>
                </Grid>
            </CardItem>
            <CardItem bordered>
                <Body>
                    <Text>
                        {title}
                    </Text>
                </Body>
            </CardItem>
            <CardItem footer bordered>
                <Grid>
                    <Row>
                        <Col style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Icon name='download' />
                            <Text style={styles.downloadCountText}> {downloadCount} </Text>
                        </Col>
                        <Col style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <TouchableOpacity>
                                <Icon type='MaterialIcons' name={saved ? 'bookmark-border' : 'bookmark'} />
                            </TouchableOpacity>
                        </Col>
                    </Row>
                </Grid>
            </CardItem>
        </Card>
    </Content >
}

