var React = require('react');
var MembersBox = require('../components/Members/MembersBox');
var serverHelpers = require('../utils/serverHelpers');

class MembersBoxContainer extends React.Component {
	constructor(props) {
		super(props);
		this.updataData = this.updataData.bind(this);
		this.state =
            {
                clients:[]
			}
	}

	updataData(data) {
		if (data.action == "user_added" || data.action == "user_left") {
			this.setState({ clients: data.data});
		}
	}
	
    componentDidMount (s,d){
		serverHelpers.registerToRoom(this.props.roomName, this.updataData);
    }

	render() {
		return (
            <MembersBox clients={this.state.clients} />
		)
	}
}


module.exports = MembersBoxContainer;