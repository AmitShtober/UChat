var React = require('react');
var ReactDom = require('react-dom');
var ReactRouter = require('react-router');
var MainChatMessages = require('../../components/Chat/MainChatMessages');
var Box = require('../../components/Base/Box');
var ModalContainer = require('react-modal-dialog').ModalContainer;
var ModalDialog = require('react-modal-dialog').ModalDialog;
var serverIsDownImage = require('../../images/server_is_down.png');
var NotificationManager = require('react-notifications').NotificationManager


class MainChat extends React.Component {

    constructor(props) {
        super(props);
        this.componentDidMount = (prevProps, prevState) => this.scrollElement();
        this.componentDidUpdate = (prevProps, prevState) => this.scrollElement();
    }

    render() {
        return (
            <div>
                {
                    this.props.isServerUp == false &&
                    <ModalContainer>
                        <ModalDialog style={{ top: 20 + '%' }} >
                            <p style={{ textAlign: 'center' }}>
                                <img src={serverIsDownImage} style={{ 'width': 250 + 'px' }} />
                            </p>
                            <h1>We are working on it.</h1>
                            <h4>(it will disappear when we will be on again)</h4>
                        </ModalDialog>
                    </ModalContainer>
                }
                <Box header={this.props.roomName} marginBottom="20px">
                    <MainChatMessages messages={this.props.messages} />
                    <div className="bottom_wrapper clearfix">
                        <form>
                            <div className="message_input_wrapper">
                                <input
                                    className="message_input"
                                    placeholder="Type your message here..."
                                    value={this.props.newMessage}
                                    onChange={this.props.onMessageChanged} /></div>
                            <div className="send_message">
                                <div className="icon"></div>
                                <button type="submit" className='text' onClick={this.props.onMessageSubmit} >send</button>
                            </div>
                        </form>
                    </div>
                </Box>
            </div>
        )
    }

    componentWillReceiveProps(nextProps) {

        var newRoom = nextProps.roomName;
        // show the notification only when you really moved from one room to another
        if (newRoom != this.props.roomName) {
            NotificationManager.warning(':)', `Welcome to "${newRoom}"`);
        }
    }

    scrollElement() {
        //store a this ref, and
        var _this = this;
        //wait for a paint to do scrolly stuff
        window.requestAnimationFrame(function () {
            var firstMessage = $(".messages")[0];
            if (firstMessage != undefined) {
                $(".messages").scrollTop($(".messages")[0].scrollHeight);
            }
        });
    }
}


module.exports = MainChat;