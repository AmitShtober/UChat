var React = require('react');
var ReactDom = require('react-dom');
var ReactRouter = require('react-router');

class MainChatMessage extends React.Component {
    render() {
        if (this.props.Side == 'right') {
            return (
                <div className="message_template ">
                    <li className="message left appeared">
                        <div className="avatar">{this.props.User} <br/><span className="time">{this.props.Time}</span></div>
                        <div className="text_wrapper text">
                            {this.props.Message}
                        </div>
                    </li>
                </div>
            )
        }
        return (

            <div className="message_template ">
                <li className="message right appeared">
                    <div className="avatar">{this.props.User} <br/><span className="time">{this.props.Time}</span></div>
                    <div className="text_wrapper text">
                        {this.props.Message}
                    </div>
                </li>
            </div>
        )
    }
}


module.exports = MainChatMessage;