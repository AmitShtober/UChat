var React = require('react');
var ReactDom = require('react-dom');
var Router = require('react-router');
var localStorageHelpers = require('../utils/localStorageHelpersMock');
var serverHelpers = require('../utils/serverHelpers');
var NotificationManager = require('react-notifications').NotificationManager

class PickName extends React.Component {
    constructor(props) {
        super(props);

        this.handleNicknameChanged = this.handleNicknameChanged.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state =
            {
                nickname: "",
                description: ""
            }

    }

    render() {
        return (
            <div>
                <form>
                    <div className="form-group">
                        <label style={{ fontSize: 18 + 'px', color: 'white' }}>Nickname:</label>
                        <input
                            type="text"
                            value={this.state.nickname}
                            onChange={this.handleNicknameChanged}
                            className="form-control" style={{ border: 0 }} id="usr" />
                    </div>
                    <div className="form-group">
                        <label style={{ fontSize: 18 + 'px', color: 'white' }}>Couple of words about you:</label>
                        <input type="text"
                            value={this.state.description}
                            onChange={this.handleDescriptionChange}
                            className="form-control" style={{ border: 0 }} id="pwd" />
                    </div>
                    <button type="submit" onClick={this.handleSubmit} className="btn btn-default">Let's Chat!</button>
                </form>
            </div>
        )
    }

    handleNicknameChanged(event) {
        this.setState({ nickname: event.target.value });
    }

    handleDescriptionChange(event) {
        this.setState({ description: event.target.value });
    }

    handleSubmit(event) {
        if (this.state.nickname == '') {
            NotificationManager.error("please enter a nick name!");
            return;
        }

        //TODO: add a check if the nickname is in use..
        event.preventDefault();

        serverHelpers.isUserExists(this.state.nickname, function (isExists) {
            if (isExists == false) {
                serverHelpers.connect(function () {
                    localStorageHelpers.setUser(this.state.nickname, this.state.description);
                    serverHelpers.enterRoom(localStorageHelpers.getUser().user_nickname, "lobby", "");
                    this.context.router.push('/room/lobby')
                }.bind(this));
            } else {
                NotificationManager.error("The username is already taken! please choose another username");
            }

        }.bind(this));
    }
}

PickName.contextTypes = {
    router: React.PropTypes.object.isRequired,
}

module.exports = PickName;