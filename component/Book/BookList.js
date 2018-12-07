import React from 'react'
import { FlatList } from 'react-native'
import { Container, View } from 'native-base'
import BookListItem from './BookListItem';

const mockBookData = [
    {
        id: 1,
        author: {
            firstName: 'Azra',
            lastName: 'Kohen'
        },
        title: 'Bir kişiye duyulan aşktan daha acımasız bir şey var mıdır?',
        description: 'Fi, deneyimin içinde kaybolmak yerine korkmadan deneyime sahip olmanın yolculuğudur. İçinde bolca bulunan manipülasyon, seks, aldatma ve aldanma hikâyeleri belki herkesin dikkatini çekebilir ama gerçeklerden yola çıkılarak ulaşılmak istenen yerde sadece farkındalık vardır.Fi güzelliğin lanetlendiği, zekânın yağmalandığı, iyinin kurban edildiği ve kasaba kurnazlığıyla yönetilen bu gezegende, içine doğduğumuz bu kutsal hayatı kutlamak için yazılmıştır. Kendi potansiyelini keşfetme cesareti gösterebilmiş gerçek kişilere, çatlama cesareti gösterebilmiş tohumlara adanmıştır.',
        downloadCount: 84,
        likeCount: 71,
        name: 'Fi'
    },
    {
        id: 2,
        author: {
            firstName: 'Azra',
            lastName: 'Kohen'
        },
        title: 'Hayat, insanın kendi potansiyeline ulaşabilmesi için dikkatle, incelikle, muhteşem bir zekâyla dizayn edilmiştir. Yapman gerekeni yapamıyorsan, olamıyorsan, doğamıyorsan hayat çok acıtır, anlaman için hırpalar, yorar. Seni sen yapabilmek için ne gerekirse yapmaya hazırdır.',
        description: 'Asla rahat bırakılmazsın. Öylesine, anlamsız varolmazsın. Mutluluğa saklanamazsın. Öyleyse acına sahip çıkmalısın! Çünkü acı, bilginin bedene inmesidir. Bilgiyi bedene indirmeli, olman gereken şeye dönüşmelisin. Bu kitap için burada olduğunun farkına varabilenlere yazıldı. Fi ile çıkılan yolculuğun tek durağıdır Çi. Sadece farkındalığa giden, değiştiren, mutlaka geliştiren bir yoldur bu ama sunduğu seks, macera, intikam, ihtiras sizi aldatmasın, zordur. Hayatı değil sistemi yaşadığımızı fark edenler, harakete geçmek için işaret bekleyenler, umursamayanlara karşı umursayanlar, hissedemeyenlere karşı hissedenler adına ve kendi tekamülünde kaybolmuşlar için yazılmış, dengeye adanmıştır. Hayat harekete geçen herkesi varması gereken yere götürür.',
        downloadCount: 76,
        likeCount: 56,
        name: 'Çi'
    },
    {
        id: 3,
        author: {
            firstName: 'Azra',
            lastName: 'Kohen'
        },
        title: 'Şimdi itiraf zamanı! İtiraf ediyorum: Sana tuzaklar kurdum. Adlarını Fi ve Çi koydum.',
        description: `Can Manay'ın Duru'ya duyduğu açlıkla çıkardım seni yola, Hiçbir şeyin göründüğü gibi olmadığını Deniz'le anlatmaya çalıştım sana… Beni takip etmen için yolumuzu onların hikâyeleriyle süsledim. Anlamları da hemen hemen her satıra gizledim. Çünkü Pi'deydi asıl anlatmak istediklerim. Çaresizdim. Vazgeçemezdim. Sana bu manzarayı mutlaka göstermeliydim. Seninle nihayet burada buluşmak için çok emek verdim. Şimdi yine gel benimle, birlikte yürümeye devam edelim. Savaşların savaşılarak kazanılamayacağını, asıl zaferin ancak doğrudan ayrılmayınca kazanıldığını Özge anlatsın sana, Yaptığımız her şeyin evrende dönüp dolaşıp bize nasıl geri geldiğini Can'dan dinle, Analiz edebildiğimiz kadar güçlü, sadeliğimiz kadar güzel, gerçekliğimizdeki samimiyet kadar eşsiz olduğumuzu Bilge'de gör, Kendi değerini başkalarının gözünden biçenlerin acısını Duru'yla anla, Ve Deniz'in düşüncelerinde tanış geleceğin insanıyla… Gel benimle. Yolumuz uzun değil, Nihayet sana gidiyoruz, bana… BİZ'e. Sorgulanmamış, analiz edilmemiş bir yaşam hiç yaşanmamıştır.`,
        downloadCount: 65,
        likeCount: 53,
        name: 'Pi'
    }
]

export default class BookList extends React.Component {
    state = {
        loading: false
    }

    _keyExtractor = (item, index) => item.id.toString();

    render() {
        return <Container>
            <View>
                <FlatList
                    data={mockBookData}
                    renderItem={({ item }) => (<BookListItem navigation={this.props.navigation} {...item} />)}
                    keyExtractor={this._keyExtractor}
                />
            </View>
        </Container>
    }
}
