var React = require('react');
var CountableBox = require('../../components/Base/CountableBox');
var serverHelpers = require('../../utils/serverHelpers');

class MembersBox extends React.Component {
	constructor(props) {
		super(props);
		this.updataData = this.updataData.bind(this);
		this.state =
            {
                clients:
                []
			}
	}

	updataData(data) {
		if (data.action == "user_added" || data.action == "user_left") {
			this.setState({ clients: data.data});
		}
	}
	
    componentDidMount (s,d){
		serverHelpers.registerToRoom("lobby", this.updataData);
    }

	render() {
		var i = 0;
		var members = this.state.clients.map((item) =>
			<li key={i++}>{item}</li>
		);

		var count = members.length;

		return (
			<CountableBox marginBottom='20px' count={count} header="Room's Members" color="blue">
				<ul className="sideBox">
					{members}
				</ul>
			</CountableBox>
		)
	}
}


module.exports = MembersBox;