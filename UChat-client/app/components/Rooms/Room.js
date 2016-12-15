var React = require('react');
var Router = require('react-router');
var CountableBox = require('../../components/Base/CountableBox');
var Link = Router.Link;

class RoomsBox extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
            if(this.props.currentRoomName != undefined && this.props.currentRoomName == this.props.text){
                return (
                <li> 
                    {this.props.text} ({this.props.description})
                </li>);
            } else {
                return (
                <li>
                    <Link to={`/room/${this.props.text}`}>{this.props.text} ({this.props.description})</Link>
                </li>);
            }
    }

}

RoomsBox.propTypes  = {
  currentRoomName: React.PropTypes.string.isRequired
};

module.exports = RoomsBox;