var React = require('react');
var ReactDom = require('react-dom');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var MainChatContainer = require('../containers/MainChatContainer');
var LeftBoxes = require('../components/LeftBoxes');

class Main extends React.Component {
    render() {
        return (
                <div className="row">
                    <div className="col-md-8 col-md-push-4" >
                        <MainChatContainer roomName={this.props.params.roomName} />
                    </div>
                    <div className="col-md-4 col-md-pull-8" style={{marginBottom: 20 + 'px' }}>
                        <LeftBoxes/>
                    </div>
                </div>
        )
    }
}

module.exports = Main;