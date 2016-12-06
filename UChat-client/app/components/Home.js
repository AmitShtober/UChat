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

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.clearData = this.clearData.bind(this);
        this.state = { isShowingModal: true };
    }

    render() {
        var helloUser = '';
        if (localStorageHelpers.isUserLogged()) {
            helloUser = 'Hello ' + localStorageHelpers.getUser().user_nickname + '!';
        }


        return (
            <div className='container'>

                <div onClick={this.handleClick}>
                    {
                        this.state.isShowingModal &&
                        <ModalContainer onClose={this.handleClose}>
                            <ModalDialog onClose={this.handleClose}>
                                <p style={{ textAlign: 'center' }}>
                                    <img src={serverIsDownImage} style={{ 'width': 250 + 'px' }} />
                                </p>
                                <h1>We are working on it.</h1>
                            </ModalDialog>
                        </ModalContainer>
                    }
                </div>

                <NotificationContainer />
                <div className="row" style={{ padding: 15 + 'px' }}>
                    <div className="page-header" >
                        <h1 className='mainHeader'>UltraChat <button className='btn' onClick={this.clearData}>clear</button><small className='mainHeaderSubtext'> Simple Chat based on #ReactJS #Bootstrap</small><br /></h1>
                        <h3 className='secondaryHeader'> {helloUser}</h3>

                    </div>
                </div>
                {this.props.children}
            </div>
        )
    }

    handleClick() {
        this.setState({ isShowingModal: true });
    }

    handleClose() {
        this.setState({ isShowingModal: false });
    }

    clearData() {
        localStorageHelpers.clearData();
        this.context.router.push('/');
    }
}

Home.contextTypes = {
    router: React.PropTypes.object.isRequired,
}

module.exports = Home;