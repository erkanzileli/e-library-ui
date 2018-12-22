import React from 'react'
import { Card, CardItem, Text, Body, Content, View, Icon, Toast } from 'native-base';
import { TouchableOpacity } from 'react-native'
import { Col, Row, Grid } from 'react-native-easy-grid';
import StarRating from 'react-native-star-rating';
import RNFetchBlob from 'rn-fetch-blob';
import { getToken } from '../../storage';
import { API_URL } from '../../env/environment';
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
    const handleDownloadPress = async () => {
        const book = props.book
        Toast.show({
            text: "İndiriliyor!",
            duration: 3000
        })
        const token = await getToken()
        RNFetchBlob.config({
            addAndroidDownloads: {
                useDownloadManager: true, // <-- this is the only thing required
                // Optional, override notification setting (default to true)
                notification: true,
                // Optional, but recommended since android DownloadManager will fail when
                // the url does not contains a file extension, by default the mime type will be text/plain
                mime: 'application/pdf',
                description: 'Dosya indirme yöneticisi tarafından indirildi.'
            }
        }).fetch('GET', `${API_URL}/file/download/${book.filePath}`, {
            'Authorization': token,
        }).then((res) => {
            let status = res.info().status;
            if (status == 200) {
                // // the conversion is done in native code
                // let base64Str = res.base64()
                // // the following conversions are done in js, it's SYNC
                // let text = res.text()
                // let json = res.json()
                Toast.show({
                    text: `${book.name} adlı kitap indirildi`,
                    buttonText: "Tamam",
                    duration: 3000,
                    type: 'success'
                })
            } else {
                // handle other status codes
            }
        })
    }
    const { id, author, title, downloadCount, likeCount, name, saved, category } = props.book
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
                                {
                                    author ? `${author.firstName} ${author.lastName}` : 'Yazar bilgisi yok'
                                }
                            </Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Text style={styles.authorText}>
                                Kategori: {
                                    category ? category.name : 'Konu bilgisi yok'
                                }
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
                            <Icon name='download' onPress={handleDownloadPress} />
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

