var React = require('react');
var ReactDom = require('react-dom');
var ReactRouter = require('react-router');
var MainChatMessage = require('../../components/Chat/MainChatMessage');

class MainChatMessages extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var i = 0;
        
        var messages = this.props.messages.map((item) =>
            <MainChatMessage
                key={i++}
                Message={item.Message}
                User={item.User}
                Time={item.Time}
                Side={item.Side} />
        );
        return (
            <div className="messages">
                {messages}
            </div>

        )
    }
}


module.exports = MainChatMessages;