var React = require('react');
var ReactDom = require('react-dom');
var ReactRouter = require('react-router');
var RoomsBoxContainer = require('../components/Rooms/RoomsBoxContainer');
var MembersBox = require('../components/Members/MembersBox');

class LeftBoxes extends React.Component {
    render () {
        return (
            <div>
                <MembersBox />
                <RoomsBoxContainer />
            </div>
        )
    }
}

module.exports = LeftBoxes;