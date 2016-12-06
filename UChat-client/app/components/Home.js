var React = require('react');
var ReactDom = require('react-dom');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var MainChatContainer = require('../containers/MainChatContainer');
var LeftBoxes = require('../components/LeftBoxes');
var localStorageHelpers = require('../utils/localStorageHelpersMock');
var NotificationContainer = require('react-notifications').NotificationContainer;
var ModalContainer = require('react-modal-dialog').ModalContainer;
var ModalDialog = require('react-modal-dialog').ModalDialog;
var serverIsDownImage = require('../images/server_is_down.png');
var serverHelpers = require('../utils/serverHelpers');

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.clearData = this.clearData.bind(this);
        this.state = { isShowingModal: false };
    }

    render() {
        var helloUser = '';

        if (localStorageHelpers.isUserLogged()) {
            helloUser = 'Hello ' + localStorageHelpers.getUser().user_nickname + '!';
        }

        return (
            <div>
                {
                    this.state.isShowingModal &&
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
                <div className='container'>

                    <NotificationContainer />
                    <div className="row" style={{ padding: 15 + 'px' }}>
                        <div className="page-header" >
                            <h1 className='mainHeader'>UltraChat <button className='btn' onClick={this.clearData}>clear</button><small className='mainHeaderSubtext'> Simple Chat based on #ReactJS #Bootstrap</small><br /></h1>
                            <h3 className='secondaryHeader'> {helloUser}</h3>
                        </div>
                    </div>
                    {this.props.children}
                </div>
            </div>
        )
    }

    handleClick() {
        this.setState({ isShowingModal: true });
    }

    clearData() {
        localStorageHelpers.clearData();
        this.context.router.push('/');
    }

    componentDidMount(s, d) {
        serverHelpers.recovery(function() {
            console.log("conn");
            this.setState({ isShowingModal: false });
        }.bind(this), function() {
            console.log("dis");
            this.setState({ isShowingModal: true });
        }.bind(this));
    }
}

Home.contextTypes = {
    router: React.PropTypes.object.isRequired,
}

module.exports = Home;