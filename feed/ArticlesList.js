'use strict';

var React = require('react-native');
var ArticleDetail = require('./Detail');


var {
    Image,
    StyleSheet,
    Text,
    View,
    Component,
    ListView,
    TouchableHighlight,
    ActivityIndicatorIOS
   } = React;


// var REQUEST_URL = 'https://www.googleapis.com/books/v1/volumes?q=subject:fiction';
var REQUEST_URL = "http://a.evanews.vn/api/feed?limit=200&page=1&mid=5";

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        
    },
    thumbnail: {
        
        height: 100,
        marginRight: 10,
        backgroundColor: 'white',
        flex:2
    },
    rightContainer: {
        flex: 3,
        backgroundColor:'white',
        height:100
    },
    title: {
        fontSize: 16,
        height:85
        
    },
    source: {
        color: '#656565',
        bottom:0
    },
    separator: {
       height: 5,
       backgroundColor: '#ddd',

   },
   listView: {
       backgroundColor: 'white',
        

   },
   loading: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center'
   },
   time:{

   }
});





class ArticlesList extends Component {
    constructor(props) {
       super(props);
       this.state = {
           isLoading: true,
           dataSource: new ListView.DataSource({
               rowHasChanged: (row1, row2) => row1 !== row2
           })
       };
   }

  componentDidMount() {
       this.fetchData();
   }
 
   fetchData() {
       fetch(REQUEST_URL)
       .then((response) => response.json())
       .then((responseData) => {
           this.setState({
               dataSource: this.state.dataSource.cloneWithRows(responseData.articles),
               isLoading: false
           });
       })
       .done();
   }

render() {
       if (this.state.isLoading) {
           return this.renderLoadingView();
       }
 
       return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderArticle.bind(this)}
                style={styles.listView}
                />
        );
}  
    
renderLoadingView() {
    return (
        <View style={styles.loading}>
            <ActivityIndicatorIOS
                size='large'/>
            <Text>
                Đang tải...
            </Text>
        </View>
    );
}

    renderArticle(article) {
       return (
           <TouchableHighlight onPress={() => this.showArticleDetail(article)}  underlayColor='#dddddd'>
                <View>
                    <View style={styles.container}>
                        <Image
                            source={{uri: article.thumbnail_medium_large_url}}
                            style={styles.thumbnail} />
                        <View style={styles.rightContainer}>
                            <Text style={styles.title}>{article.title}</Text>
                            <Text style={styles.source}>{article.source}</Text>
                        </View>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableHighlight>
       );
   }

   showArticleDetail(article) {
       this.props.navigator.push({
           title: article.title,
           component: ArticleDetail,
           passProps: {article}
       });
   }
}

module.exports = ArticlesList;