var React = require('react');
var ReactDom = require('react-dom');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var MainChatContainer = require('../containers/MainChatContainer');
var LeftBoxes = require('../components/LeftBoxes');
var localStorageHelpers = require('../utils/localStorageHelpers');

class Home extends React.Component {
    render() {
        var helloUser = '';
        if (localStorageHelpers.isUserLogged()) {
            helloUser = 'Hello ' + localStorageHelpers.getUser().user_nickname + '!';
        }

        this.clearData = this.clearData.bind(this);

        return (
            <div className='container'>
                <div className="row" style={{ padding: 15 + 'px' }}>
                    <div className="page-header" >
                        <h1 className='mainHeader'>UltraChat <button className='btn' onClick={this.clearData}>clear</button><small className='mainHeaderSubtext'> Simple Chat based on #ReactJS #Bootstrap</small><br/></h1>
                        <h3 className='secondaryHeader'> {helloUser}</h3>

                    </div>
                </div>
                {this.props.children}
            </div>
        )
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