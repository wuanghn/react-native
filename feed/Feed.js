'use strict';

var React = require('react-native');
var ArticleList = require('./ArticlesList');

var {
    StyleSheet,
    NavigatorIOS,
    Component
   } = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        color:'red',
        backgroundColor: 'red',
        // width:'100%'
    }
});

class Feed extends Component {
    render() {
        return (
            <NavigatorIOS
                style={styles.container}
                initialRoute={{
            title: 'Home',
            component: ArticleList
            }}/>            
        );
    }
}

module.exports = Feed;