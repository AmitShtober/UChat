var React = require('react');
var ReactDom = require('react-dom');
var ReactRouter = require('react-router');
var MainChat = require('../components/Chat/MainChat');
var localStorageHelpers = require('../utils/localStorageHelpersMock');
var serverPupSubHelper = require('../utils/serverPupSubHelper');
var NotificationManager = require('react-notifications').NotificationManager

class MainChatContainer extends React.Component {

    constructor(props) {
        super(props);
        this.handleMessageChanged = this.handleMessageChanged.bind(this);
        this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
        this.updataData = this.updataData.bind(this);
        this.setServerUpState = this.setServerUpState.bind(this);
        this.setServerDownState = this.setServerDownState.bind(this);

        this.state =
            {
                roomName: this.props.roomName,
                newMessage: "",
                messages: [],
                isServerUp: true
            };
    }

    render() {

        return (
            <MainChat
                isServerUp={this.state.isServerUp}
                roomName={this.state.roomName}
                onMessageSubmit={this.handleMessageSubmit}
                onMessageChanged={this.handleMessageChanged}
                newMessage={this.state.newMessage}
                messages={this.state.messages} />
        )
    }

    updataData(data) {

        if (data.action == "new_message") {

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
           NotificationManager.error("You can't send an empty message!");
            return;
        }

        serverPupSubHelper.sendMessage(this.state.roomName, localStorageHelpers.getUser().user_nickname, newMessage, new Date().toLocaleString());

        this.setState({
            newMessage: "",
        });
    }

    componentDidMount(s, d) {
        serverPupSubHelper.registerToRoom(this.state.roomName, this.updataData);
        
        // recovery function
        serverPupSubHelper.recovery(this.setServerUpState, this.setServerDownState);
    }

    componentWillUnmount(s, d) {
        serverPupSubHelper.unRegisterToRoom(this.state.roomName, this.updataData);

        // remove recovery functions
        serverPupSubHelper.unRecovery(this.setServerUpState, this.setServerDownState);

    }

    setServerUpState() {
        this.setState({ isServerUp: true });
        
        // make the user log to the room once again after the server was down
        serverPupSubHelper.enterRoom(localStorageHelpers.getUser().user_nickname, this.state.roomName, "");
    }

    setServerDownState() {
        this.setState({ isServerUp: false });
    }

    componentWillReceiveProps(nextProps) {
        var oldRoom = this.state.roomName;
        var newRoom = nextProps.roomName;
        serverPupSubHelper.unRegisterToRoom(oldRoom, this.updataData);
        this.setState({ roomName: newRoom, messages: [] });
        serverPupSubHelper.enterRoom(localStorageHelpers.getUser().user_nickname, newRoom, oldRoom);
        serverPupSubHelper.registerToRoom(newRoom, this.updataData);
    }
}

MainChatContainer.contextTypes = {
    router: React.PropTypes.object.isRequired,
}

module.exports = MainChatContainer;
