import React from 'react'
import { Card, CardItem, Text, Body, Content, View, Icon } from 'native-base';
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

function BookListItem({ author, description, downloadCount, likeCount, name }) {
    return <View>
        <Content>
            <Card>
                <CardItem header bordered>
                    <Grid>
                        <Row>
                            <Col size={5}>
                                <Text style={{ fontSize: 20 }} >{name}</Text>
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
                            {description}
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
                                <Icon type='MaterialIcons' name='bookmark-border' />
                            </Col>
                        </Row>
                    </Grid>
                </CardItem>
            </Card>
        </Content>
    </View>
}

export default BookListItem
