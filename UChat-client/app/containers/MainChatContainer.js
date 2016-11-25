var React = require('react');
var ReactDom = require('react-dom');
var ReactRouter = require('react-router');
var MainChat = require('../components/Chat/MainChat');
var localStorageHelpers = require('../utils/localStorageHelpersMock');
var serverHelpers = require('../utils/serverHelpers');

class MainChatContainer extends React.Component {

    constructor(props) {
        super(props);
        this.handleMessageChanged = this.handleMessageChanged.bind(this);
        this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
        this.updataData = this.updataData.bind(this);

        this.state =
            {
                roomName : this.props.roomName,
                newMessage: "",
                messages: []
            };
    }

    render() {
        
        return (
            <MainChat
                roomName={this.state.roomName}
                onMessageSubmit={this.handleMessageSubmit}
                onMessageChanged={this.handleMessageChanged}
                newMessage={this.state.newMessage}
                messages={this.state.messages} />
        )
    }

    updataData(data) {
        
        if (data.action == "new_message") {
            console.log(data);
            var side = "left";
            if (data.data.nickName == localStorageHelpers.getUser().user_nickname) {
                side = "right";
            }
            var message = { Message: data.data.message, User: data.data.nickName, Time: data.data.timestamp, Side: side };

            var allMessages = this.state.messages;

            allMessages.push(message);

            this.setState({
                messages: allMessages
            });
        }
    }

    handleMessageChanged(event) {
        this.setState({ newMessage: event.target.value });
    }

    handleMessageSubmit(event) {
        event.preventDefault();

        var newMessage = this.state.newMessage;

        if (newMessage == '') {
            alert('The message is empty!');
            return;
        }

        serverHelpers.sendMessage(this.state.roomName, localStorageHelpers.getUser().user_nickname, newMessage, new Date().toLocaleString());

          this.setState({
                newMessage: "",
            });
    }

    componentDidMount(s, d) {
        serverHelpers.registerToRoom(this.state.roomName, this.updataData);
    }

    componentWillUnmount(s, d) {
        serverHelpers.unRegisterToRoom(this.state.roomName, this.updataData);
    }

    componentWillReceiveProps(nextProps) {
        var oldRoom = this.state.roomName;
        serverHelpers.unRegisterToRoom(oldRoom, this.updataData);
        this.setState({roomName:nextProps.roomName});
        serverHelpers.registerToRoom(nextProps.roomName, this.updataData);
    } 
}

MainChatContainer.contextTypes = {
    router: React.PropTypes.object.isRequired,
}

module.exports = MainChatContainer;
