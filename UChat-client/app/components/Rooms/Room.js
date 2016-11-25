var React = require('react');
var Router = require('react-router');
var CountableBox = require('../../components/Base/CountableBox');
var Link = Router.Link;

class RoomsBox extends React.Component {

    render() {
        return (
            <li>
                <Link to={`/room/${this.props.text}`}>{this.props.text} ({this.props.description})</Link>
            </li>
        )
    }
}

module.exports = RoomsBox;