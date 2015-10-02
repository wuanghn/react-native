'use strict';
 
var React = require('react-native');
 
var {
    StyleSheet,
    Text,
    View,
    Component,
    Image
   } = React;
 
var styles = StyleSheet.create({
    container: {
        marginTop: 75,
        alignItems: 'center'
    },
    image: {
        width: 107,
        height: 165,
        padding: 10
    },
    description: {
        padding: 10,
        fontSize: 15,
        color: '#656565'
    }
});
 
class Detail extends Component {
    render() {
        var article = this.props.article;
        var imageURI = (typeof article.thumbnail_medium_vertical_url !== 'undefined') ? article.thumbnail_medium_vertical_url : '';
        var description = (typeof article.description !== 'undefined') ? article.description : '';
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={{uri: imageURI}} />
                <Text style={styles.description}>{description}</Text>
            </View>
        );
    }
}
 
module.exports = Detail;