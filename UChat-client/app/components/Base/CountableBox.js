var React = require('react');
var ReactDom = require('react-dom');
var ReactRouter = require('react-router');
var Box = require('../../components/Base/Box');

class CountableBox extends React.Component {

    render() {

        var count = this.props.count;
        var title = this.props.header;
        var editedTitle = title + " (" + count + ")"

        return (
            <Box header={editedTitle}
                color={this.props.color}
                marginBottom={this.props.marginBottom}>
                {this.props.children}
            </Box>
        )
    }
}

module.exports = CountableBox; 