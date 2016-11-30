var React = require('react');
var ReactDom = require('react-dom');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var MainChatContainer = require('../containers/MainChatContainer');
var LeftBoxes = require('../components/LeftBoxes');

class Main extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {currentRoomName:this.props.params.roomName}
    }

    render() {
        return (
                <div className="row">
                    <div className="col-md-8 col-md-push-4" >
                        <MainChatContainer roomName={this.state.currentRoomName} />
                    </div>
                    <div className="col-md-4 col-md-pull-8" style={{marginBottom: 20 + 'px' }}>
                        <LeftBoxes roomName={this.state.currentRoomName} />
                    </div>
                </div>
        )
    }

    componentWillReceiveProps(nextProps) {
        var newRoom = nextProps.params.roomName;
        // show the notification only when you really moved from one room to another
        if (newRoom != this.state.roomName) {
            this.setState({currentRoomName:newRoom});
        }
    }
}

module.exports = Main;