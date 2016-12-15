var React = require('react');
var ReactDom = require('react-dom');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var MainChatContainer = require('../containers/MainChatContainer');
var LeftBoxes = require('../components/LeftBoxes');
var localStorageHelpers = require('../utils/localStorageHelpersMock');
var NotificationContainer = require('react-notifications').NotificationContainer;

require("style!../style/style.css");
require("style!../../node_modules/react-notifications/lib/notifications.css");

class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var helloUser = '';

        if (localStorageHelpers.isUserLogged()) {
            helloUser = 'Hello ' + localStorageHelpers.getUser().user_nickname + '!';
        }

        return (
            <div className='container'>

                <NotificationContainer />
                <div className="row" style={{ padding: 15 + 'px' }}>
                    <div className="page-header" >
                        <h1 className='mainHeader'>UltraChat <small className='mainHeaderSubtext'> Simple Chat based on #ReactJS #Bootstrap #NodeJS #SocketIO</small><br /></h1>
                        <h3 className='secondaryHeader'> {helloUser}</h3>
                    </div>
                </div>
                {this.props.children}
            </div>
        )
    }
}

Home.contextTypes = {
    router: React.PropTypes.object.isRequired,
}

module.exports = Home;