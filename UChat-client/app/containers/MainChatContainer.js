var React = require('react');
var ReactDom = require('react-dom');
var ReactRouter = require('react-router');
var MainChat = require('../components/Chat/MainChat');
var localStorageHelpers = require('../utils/localStorageHelpers');
var serverHelpers = require('../utils/serverHelpers');

class MainChatContainer extends React.Component {

    constructor(props) {
        super(props);
        this.handleMessageChanged = this.handleMessageChanged.bind(this);
        this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
        this.updataData = this.updataData.bind(this);

        this.state =
            {
                newMessage: "",
                messages: []
            };
    }

    render() {
        return (
            <MainChat
                roomName={this.props.roomName}
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
                newMessage: "",
                messages: allMessages
            });
        }
    }

    handleMessageChanged(event) {
        this.setState({ newMessage: event.target.value });
    }

    handleMessageSubmit(event) {
        event.preventDefault();
        console.log("asd");
        var newMessage = this.state.newMessage;

        if (newMessage == '') {
            alert('The message is empty!');
            return;
        }
        serverHelpers.sendMessage(this.props.roomName, localStorageHelpers.getUser().user_nickname, newMessage, new Date().toLocaleString());
    }

    // routeToPickNameIfNotLogged() {
    //     if (!localStorageHelpers.isUserLogged()) {
    //         this.context.router.push('/');
    //     }
    // }

    componentDidMount(s, d) {
        serverHelpers.registerToRoom("lobby", this.updataData);
    }

    componentWillUnmount(s, d) {
        serverHelpers.unRegisterToRoom("lobby", this.updataData);
    }

}

MainChatContainer.contextTypes = {
    router: React.PropTypes.object.isRequired,
}

module.exports = MainChatContainer;
