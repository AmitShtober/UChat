var React = require('react');
var ReactDom = require('react-dom');
var ReactRouter = require('react-router');
var RoomsBoxContainer = require('../containers/RoomsBoxContainer');
var MembersBoxContainer = require('../containers/MembersBoxContainer');

class LeftBoxes extends React.Component {
    render () {
        return (
            <div>
                <MembersBoxContainer roomName={this.props.roomName} />
                <RoomsBoxContainer />
            </div>
        )
    }
}

module.exports = LeftBoxes;