var React = require('react');
var MembersBox = require('../components/Members/MembersBox');
var serverPupSubHelper = require('../utils/serverPupSubHelper');

class MembersBoxContainer extends React.Component {
	constructor(props) {
		super(props);
		this.updataData = this.updataData.bind(this);
		this.state =
            {
                clients: []
			}
	}

	updataData(data) {
		if (data.action == "user_added" || data.action == "user_left") {
			this.setState({ clients: data.data });
		}
	}

	componentWillUnmount(s, d) {
		serverPupSubHelper.unRegisterToRoom(this.props.roomName, this.updataData);
	}

    componentDidMount(s, d) {
		serverPupSubHelper.registerToRoom(this.props.roomName, this.updataData);
    }
	componentWillReceiveProps(nextProps) {
		if (nextProps.roomName != this.props.roomName) {
			serverPupSubHelper.unRegisterToRoom(this.props.roomName, this.updataData);
			serverPupSubHelper.registerToRoom(nextProps.roomName, this.updataData);
		}
	}
	render() {
		return (
            <MembersBox clients={this.state.clients} />
		)
	}
}


module.exports = MembersBoxContainer;